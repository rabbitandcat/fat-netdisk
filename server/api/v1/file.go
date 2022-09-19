package v1

import (
	"fat-netdisk/model"
	"fat-netdisk/utils/errmsg"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetBucketFileList(c *gin.Context) {
	fileInfoList, code := model.GetFileList()
	c.JSON(http.StatusOK, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
		"data":    fileInfoList,
	})
}
