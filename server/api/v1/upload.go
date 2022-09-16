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

// UpLoad 上传图片接口
func UpLoad(c *gin.Context) {
	file, fileHeader, _ := c.Request.FormFile("file")
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
		filePath = path
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

func GetFileList(c *gin.Context) {
	list, fileInfoList, code := model.GetFileList()
	c.JSON(http.StatusOK, gin.H{
		"status":       code,
		"message":      errmsg.GetErrMsg(code),
		"data":         list,
		"fileInfoList": fileInfoList,
	})
}
