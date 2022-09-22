package v1

import (
	"fat-netdisk/model"
	"fat-netdisk/utils/errmsg"
	"fmt"
	"github.com/gin-gonic/gin"
	"mime"
	"net/http"
)

var filePath string

func GetBucketFileList(c *gin.Context) {
	fileInfoList, code := model.GetFileList()
	c.JSON(http.StatusOK, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
		"data":    fileInfoList,
	})
}

func UploadFile(c *gin.Context) {
	file, fileHeader, _ := c.Request.FormFile("file")
	prefix := c.Query("prefix")
	fmt.Println("prefix是", prefix)
	// 解析标头
	header := fileHeader.Header.Get("Content-Disposition")
	if header != "" {
		_, params, err := mime.ParseMediaType(header)
		if err != nil {
			fmt.Println("解析标头错误", err)
			return
		}
		path, ok := params["filename"]
		if !ok {
			fmt.Println("filename parameter not exist!")
			return
		}
		filePath = prefix + "/" + path
	}
	fileName := fileHeader.Filename
	fileSize := fileHeader.Size

	url, code := model.UpLoadFile(file, fileSize, fileName, filePath)

	c.JSON(http.StatusOK, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
		"url":     url,
	})
}

func DownloadFile(c *gin.Context) {
	fileKey := c.Query("fileName")
	url, code := model.DownloadFile(fileKey)
	c.JSON(http.StatusOK, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
		"url":     url,
	})
}
