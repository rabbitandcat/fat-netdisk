package routes

import (
	v1 "fat-netdisk/api/v1"
	"fat-netdisk/middleware"
	"fat-netdisk/utils"
	"github.com/gin-gonic/gin"
)

func InitRouter() {
	gin.SetMode(utils.AppMode)
	r := gin.New()
	auth := r.Group("api/v1")
	auth.Use(middleware.Cors())
	{
		auth.GET("BucketFileList", v1.GetBucketFileList)
	}

	_ = r.Run(utils.HttpPort)
}
