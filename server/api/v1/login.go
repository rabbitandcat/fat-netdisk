package v1

import (
	"fat-netdisk/middleware"
	"fat-netdisk/model"
	"fat-netdisk/utils/errmsg"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// Login 后台登陆
func Login(c *gin.Context) {
	var formData model.User         // 定义一个结构体
	_ = c.ShouldBindJSON(&formData) // 获取前端传递的数据
	var token string                // 定义一个token
	var code int                    // 定义一个code

	formData, code = model.CheckLogin(formData.Username, formData.Password) // 检查登录信息，包括检验密码是否和数据库中加密的密码一致

	if code == errmsg.SUCCESS { // 如果登录成功，开始设置token
		setToken(c, formData)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status":  code,
			"data":    formData.Username,
			"id":      formData.ID,
			"message": errmsg.GetErrMsg(code),
			"token":   token,
		})
	}

}

// token生成函数
func setToken(c *gin.Context, user model.User) {
	j := middleware.NewJWT()
	claims := middleware.MyClaims{
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			NotBefore: time.Now().Unix() - 100,
			ExpiresAt: time.Now().Unix() + 300,
			Issuer:    "FatCloud",
		},
	}

	token, err := j.CreateToken(claims)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status":  errmsg.ERROR,
			"message": errmsg.GetErrMsg(errmsg.ERROR),
			"token":   token,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   200,
		"username": user.Username,
		"id":       user.ID,
		"message":  errmsg.GetErrMsg(200),
		"token":    token,
	})
	return
}
