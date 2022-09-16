package v1

import (
	"github.com/gin-gonic/gin"
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
	data := []map[string]interface{}{
		{
			"name":             "test",
			"meta":             "test",
			"type":             "test",
			"size":             1,
			"lastModified":     1,
			"lastModifiedDate": 1,
		},
		{
			"name":             "test2",
			"meta":             "test2",
			"type":             "test2",
			"size":             1,
			"lastModified":     1,
			"lastModifiedDate": 1,
		},
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "获取成功",
		"data":    data,
	})
}
