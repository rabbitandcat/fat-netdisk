package model

import (
	"context"
	"fat-netdisk/utils"
	"fat-netdisk/utils/errmsg"
	"fmt"
	"github.com/qiniu/go-sdk/v7/auth/qbox"
	"github.com/qiniu/go-sdk/v7/storage"
	"mime/multipart"
	"strings"
)

// 自定义返回值结构体
type MyPutRet struct {
	Key    string
	Hash   string
	Fsize  int
	Bucket string
	Name   string
}

var AccessKey = utils.AccessKey
var SecretKey = utils.SecretKey
var Bucket = utils.Bucket
var ImgUrl = utils.QiniuSever

var fileList []string

type VFile struct {
	Name               string `json:"name"`
	WebkitRelativePath string `json:"webkitRelativePath"`
	Type               string `json:"type"`
	Size               int64  `json:"size"`
	LastModified       int64  `json:"lastModified"`
	LastModifiedDate   string `json:"lastModifiedDate"`
}

func GetFileList() ([]interface{}, int) {
	mac := qbox.NewMac(AccessKey, SecretKey)
	cfg := storage.Config{
		// 是否使用https域名进行资源管理
		UseHTTPS: false,
	}
	bucketManager := storage.NewBucketManager(mac, &cfg)

	bucket := "fat-netdisk"
	limit := 1000
	prefix := ""
	delimiter := ""
	//初始列举marker为空
	marker := ""
	fileInfoList := []interface{}{}

	for {
		entries, _, nextMarker, hasNext, err := bucketManager.ListFiles(bucket, prefix, delimiter, marker, limit)
		if err != nil {
			fmt.Println("list error,", err)
			break
		}
		//print entries
		for _, entry := range entries {
			fileInfoList = append(fileInfoList, ItemAdapter(entry))
		}
		if hasNext {
			marker = nextMarker
		} else {
			//list end
			break
		}
	}
	return fileInfoList, errmsg.SUCCESS
}

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

	err := formUploader.Put(context.Background(), &ret, upToken, key, file, fileSize, &putExtra)
	if err != nil {
		fmt.Println("上传失败", err)
		return "", errmsg.ERROR
	}
	url := ImgUrl + ret.Key
	fmt.Printf("ret.Key:%s, ret.Name:%s, ret.Hash:%s, ret.Fsize:%s, ret.Bucket:%s", ret.Key, ret.Name, ret.Hash, ret.Fsize, ret.Bucket)
	return url, errmsg.SUCCESS
}

func DownloadFile(fileNameList []string, prefix string) ([]string, int) {
	domain := utils.QiniuSever
	urlList := []string{}
	for _, fileName := range fileNameList {
		fmt.Println(fileName)
		urlList = append(urlList, storage.MakePublicURL(domain, prefix+"/"+fileName))
	}
	fmt.Println(urlList)
	return urlList, errmsg.SUCCESS
}

func ItemAdapter(item storage.ListItem) VFile {
	var file VFile
	file.WebkitRelativePath = item.Key
	path := strings.Split(item.Key, "/")
	file.Name = path[len(path)-1]
	//file.Name = file.Name[:len(file.Name)-1]
	file.Type = item.MimeType
	file.Size = item.Fsize
	file.LastModified = 0
	tm := storage.ParsePutTime(item.PutTime)
	file.LastModifiedDate = tm.Format("2006-01-02 15:04:05")
	return file
}
