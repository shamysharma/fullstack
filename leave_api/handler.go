package main

import (
	"fmt"
	"log"
	"net/http"
	"os"



	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func getId(c *gin.Context) {
	id := c.Param("id")

	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT id, name, leave_type, from_date, to_date, team_name, sick_leaves_file, reporter, status FROM leaves WHERE id= $1", id)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var leaves []leave_for_get
	for rows.Next() {
		var a leave_for_get
		err := rows.Scan(&a.Id, &a.Name, &a.Leave_type, &a.From_date, &a.To_date, &a.Team_name,&a.Sick_leaves_file, &a.Reporter, &a.Status)
		if err != nil {
			log.Fatal(err)
		}
		leaves = append(leaves, a)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	c.IndentedJSON(http.StatusOK, leaves)
}

func getnotify(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM notifications")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var notifi []notify
	for rows.Next() {
		var a notify
		err := rows.Scan(&a.Id, &a.Reporter, &a.Status)
		if err != nil {
			log.Fatal(err)
		}
		notifi = append(notifi, a)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	c.IndentedJSON(http.StatusOK, notifi)
}

func topFive(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	rows, err := db.Query("SELECT * FROM topfive2023")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var t []topfive
	for rows.Next() {
		var a topfive
		err := rows.Scan(&a.Name, &a.Count)
		if err != nil {
			log.Fatal(err)
		}
		t = append(t, a)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	c.IndentedJSON(http.StatusOK, t)
}

func getPerManager(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM permanager")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var pm []manager
	for rows.Next() {
		var b manager
		err := rows.Scan(&b.Reporter, &b.Count)
		if err != nil {
			log.Fatal(err)
		}
		pm = append(pm, b)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	c.IndentedJSON(http.StatusOK, pm)
}

func teamDiv(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM teamd2022")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var pm []division
	for rows.Next() {
		var c division
		err := rows.Scan(&c.Team_name, &c.Leave_type, &c.Leave_count)
		if err != nil {
			log.Fatal(err)
		}
		pm = append(pm, c)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	c.IndentedJSON(http.StatusOK, pm)
}



func postUpdate(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	var err error
	id := c.Param("id")

	sql1 := `UPDATE notification SET status ='Approved' Where id = '$1';`
	_, err = db.Exec(sql1, id)

	if err != nil {
		panic(err)
	}

	forLeaves := `UPDATE leaves set status ='Approved' WHERE id = '$1';`
	_, err = db.Exec(forLeaves, id)

	if err != nil {
		panic(err)
	}
}

func RejectUpdate(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var err error
	id := c.Param("id")

	q1 := `UPDATE notification SET status ='Rejected' WHERE id = '$1';`
	_, err = db.Exec(q1, id)

	if err != nil {
		panic(err)
	}

	q2 := `UPDATE leaves set status='Rejected' WHERE id = '$1';`
	_, err = db.Exec(q2, id)

	if err != nil {
		panic(err)
	}

}

func getLeaves(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT id, name, leave_type, from_date, to_date, team_name, sick_leaves_file, reporter, status FROM leaves")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var leaves []leave_for_get
	for rows.Next() {
		var a leave_for_get
		err := rows.Scan(&a.Id, &a.Name, &a.Leave_type, &a.From_date, &a.To_date, &a.Team_name, &a.Sick_leaves_file, &a.Reporter, &a.Status)
		if err != nil {
			log.Fatal(err)
		}
		leaves = append(leaves, a)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	c.IndentedJSON(http.StatusOK, leaves)
}

func postLeave(c *gin.Context) {

	var asLeave leave
	if err := c.ShouldBind(&asLeave); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if asLeave.Leave_type == "Sick leave" {
		// Check if the file was uploaded
		file, err := c.FormFile("file")
		fmt.Println("file: ", file)
		if file == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "File upload is required for Sick Leave"})
			return
		}
		if err == nil {
			c.JSON(http.StatusOK, gin.H{"file": "file successfully uploaded"})
		}

		tempfilePath := "./documents/temp/" + file.Filename
		fmt.Println("filepath: ", tempfilePath)

		if err := c.SaveUploadedFile(file, tempfilePath); err != nil {

			c.String(http.StatusInternalServerError, "Failed to save file")

			return

		}
		_, err = db.Exec("INSERT INTO leaves (name, leave_type, from_date, to_date, team_name, sick_leaves_file, reporter, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			asLeave.Name, asLeave.Leave_type, asLeave.From_date, asLeave.To_date, asLeave.Team_name, tempfilePath, asLeave.Reporter, asLeave.Status)
		if err != nil {
			log.Fatal(err)
		}

		c.JSON(http.StatusCreated, asLeave)
	} else {
		// file, _ := c.FormFile("file")

		// tempfilePath := "./documents/temp/" + file.Filename

		_, err1 := db.Exec("INSERT INTO leaves (name, leave_type, from_date, to_date, team_name, sick_leaves_file, reporter, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			asLeave.Name, asLeave.Leave_type, asLeave.From_date, asLeave.To_date, asLeave.Team_name, "null", asLeave.Reporter, asLeave.Status)
		if err1 != nil {
			log.Fatal(err1)
		}
		c.JSON(http.StatusCreated, asLeave)
	}

}

func getFile(c *gin.Context) {
	id := c.Param("id")

	var fileName string
	err := db.QueryRow("SELECT sick_leaves_file FROM leaves WHERE id = $1", id).Scan(&fileName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve file information"})
		return
	}

	if fileName == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}

	file, err := os.Open(fmt.Sprintf("./documents/temp/%s", fileName))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	defer file.Close()

	fileInfo, err := file.Stat()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get file information"})
		return
	}

	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", fileName))
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Length", fmt.Sprintf("%d", fileInfo.Size()))

	http.ServeContent(c.Writer, c.Request, fileName, fileInfo.ModTime(), file)
}
