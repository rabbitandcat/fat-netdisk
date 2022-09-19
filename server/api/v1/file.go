package v1

import (
	"fat-netdisk/model"
	"fat-netdisk/utils/errmsg"
	"github.com/gin-gonic/gin"
	"net/http"
)

type BucketFile struct {
	Name               string `json:"name"`
	WebkitRelativePath string `json:"webkitRelativePath"`
	Meta               string `json:"meta"`
	Type               string `json:"type"`
	Size               int    `json:"size"`
	LastModified       int    `json:"lastModified"`
	LastModifiedDate   int    `json:"lastModifiedDate"`
	ShortId            int    `json:"shortId"`
}

func GetBucketFileList(c *gin.Context) {
	fileInfoList, code := model.GetFileList()
	c.JSON(http.StatusOK, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
		"data":    fileInfoList,
	})
}
