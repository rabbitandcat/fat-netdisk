package model

import (
	"context"
	"fat-netdisk/utils"
	"fat-netdisk/utils/errmsg"
	"fmt"
	"github.com/qiniu/go-sdk/v7/auth/qbox"
	"github.com/qiniu/go-sdk/v7/sms/rpc"
	"github.com/qiniu/go-sdk/v7/storage"
	"mime/multipart"
)

// 自定义前端上传json数据及格式
type FileInfo struct {
	Name string `json:"name" gorm:"comment:文件名"` // 文件名
	Url  string `json:"url" gorm:"comment:文件地址"` // 文件地址
	Tag  string `json:"tag" gorm:"comment:文件标签"` // 文件标签
	Key  string `json:"key" gorm:"comment:编号"`   // 编号
}

// 自定义返回值结构体
type MyPutRet struct {
	Key    string
	Hash   string
	Fsize  int
	Bucket string
	Name   string
}

type returnData struct {
	Hash     string `json:"hash"`
	Fsize    int64  `json:"fsize"`
	PutTime  string `json:"putTime"`
	MimeType string `json:"mimeType"`
	Type     int    `json:"type"`
	Error    string `json:"error"`
}

var AccessKey = utils.AccessKey
var SecretKey = utils.SecretKey
var Bucket = utils.Bucket
var ImgUrl = utils.QiniuSever

var fileList []string

var newData returnData

func UpLoadFile(file multipart.File, fileSize int64, fileName string, filePath string) (string, int) {
	key := filePath
	putPolicy := storage.PutPolicy{
		Scope:      Bucket,
		ReturnBody: `{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}`,
	}
	mac := qbox.NewMac(AccessKey, SecretKey)
	upToken := putPolicy.UploadToken(mac)

	cfg := storage.Config{
		Zone:          &storage.ZoneHuabei,
		UseCdnDomains: false,
		UseHTTPS:      false,
	}

	putExtra := storage.PutExtra{
		Params: map[string]string{
			"x:name": fileName,
		},
	}

	formUploader := storage.NewFormUploader(&cfg)
	ret := MyPutRet{}
	//ret := storage.PutRet{}

	err := formUploader.Put(context.Background(), &ret, upToken, key, file, fileSize, &putExtra)
	if err != nil {
		fmt.Println("上传失败", err)
		return "", errmsg.ERROR
	}
	//fmt.Printf("存储空间: %s, 路径: %s, 文件大小: %v, 哈希值: %s, 文件名: %s\n", ret.Bucket, ret.Key, ret.Fsize, ret.Hash, ret.Name)
	//fmt.Println(ret)
	url := ImgUrl + ret.Key
	return url, errmsg.SUCCESS

}

func GetFileList() ([]string, []interface{}, int) {
	mac := qbox.NewMac(AccessKey, SecretKey)
	cfg := storage.Config{
		// 是否使用https域名进行资源管理
		UseHTTPS: false,
	}
	bucketManager := storage.NewBucketManager(mac, &cfg)

	bucket := "fatcloud"
	limit := 1000
	prefix := ""
	delimiter := ""
	//初始列举marker为空
	marker := ""
	fileList := []string{}

	for {
		entries, _, nextMarker, hasNext, err := bucketManager.ListFiles(bucket, prefix, delimiter, marker, limit)
		if err != nil {
			fmt.Println("list error,", err)
			break
		}
		//print entries
		for _, entry := range entries {
			fileList = append(fileList, entry.Key)
		}
		if hasNext {
			marker = nextMarker
		} else {
			//list end
			break
		}
	}
	//fmt.Println(fileList)
	keys := fileList
	fileInfoList := []interface{}{}
	statOps := make([]string, 0, len(keys))
	for _, key := range keys {
		statOps = append(statOps, storage.URIStat(bucket, key))
	}

	rets, err := bucketManager.Batch(statOps)
	if err != nil {
		// 遇到错误
		if _, ok := err.(*rpc.ErrorInfo); ok {
			for _, ret := range rets {
				// 200 为成功
				fmt.Printf("%d\n", ret.Code)
				if ret.Code != 200 {
					fmt.Printf("%s\n", ret.Data.Error)
				} else {
					fmt.Printf("%v\n", ret.Data)
				}
			}
		} else {
			fmt.Printf("batch error, %s", err)
		}
	} else {
		// 完全成功
		for _, ret := range rets {
			tm := storage.ParsePutTime(ret.Data.PutTime)
			newData.Hash = ret.Data.Hash
			newData.PutTime = tm.Format("2006-01-02 15:04:05")
			newData.Fsize = ret.Data.Fsize
			newData.MimeType = ret.Data.MimeType
			newData.Type = ret.Data.Type
			newData.Error = ret.Data.Error

			fileInfoList = append(fileInfoList, newData)
		}
	}
	//fmt.Println(fileInfoList)
	return fileList, fileInfoList, errmsg.SUCCESS
}
