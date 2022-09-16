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
	auth.Use(middleware.JwtToken())
	{
		auth.GET("user/:id", v1.GetUserInfo)
	}
	router := r.Group("/api/v1")
	{
		//用户模块的增删改查
		router.POST("user/add", v1.AddUser)

		router.GET("users", v1.GetUsers)

		router.PUT("user/:id", v1.EditUser)
		router.DELETE("user/:id", v1.DeleteUser)

		//管理员权限的用户模块的增删改查
		router.PUT("admin/changepw/:id", v1.ChangeUserPassword)

		//上传文件
		router.POST("upload", v1.UpLoad)
		//获取文件列表
		router.GET("fileList", v1.GetFileList)
		//登录
		router.POST("login", v1.Login)
	}

	_ = r.Run(utils.HttpPort)
}
