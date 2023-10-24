package main

type leave struct {
	Id               string `form:"id"`
	Name             string `form:"name"`
	Leave_type       string `form:"leave_type"`
	From_date        string `form:"from_date"`
	To_date          string `form:"to_date"`
	Team_name        string `form:"team_name"`
	Reporter         string `form:"reporter"`
	Sick_leaves_file string `form:"sick_leaves_file"`
	Status           string `form:"status"`
}

func (e leave) String() {}

type leave_for_get struct {
	leave
	Sick_leaves_file string `form:"sick_leaves_file"`
	Status           string `form:"status"`

}

type notify struct {
	Id       string `form:"id"`
	Reporter string `form:"reporter"`
	Status   string `form:"status"`
}

type topfive struct {
	Name   string `form:"name"`
	Count  string `form:"count"`
}


type manager struct {
	Reporter string `form:"reporter"`
    Count string `form:"count"`
}

type division struct {
	Team_name string `form:"team_name"`
	Leave_type string `form:"leave_type"`
	Leave_count string `form:"leave_count"`
}