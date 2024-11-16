package review

type OverView struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	Company   string `json:"company"`
	CreatedAt string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Review    struct {
		Position string `json:"position"`
		Title    string `json:"title"`
		Rating   int    `json:"rating"`
		Content  string `json:"content"`
	} `json:"review"`
}

type Salary struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	Company   string `json:"company"`
	CreatedAt string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Review    struct {
		Salary   string `json:"salary"`
		Position string `json:"position"`
	} `json:"review"`
}

type Benefit struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	Company   string `json:"company"`
	CreatedAt string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Review    struct {
		Position        string `json:"position"`
		Wfh             int    `json:"wfh"`
		HealthInsurance int    `json:"health_insurance"`
		CoursePaid      int    `json:"l_and_d"`
		StockPlan       int    `json:"stock_plan"`
		StockOption     int    `json:"stock_option"`
		AnnualLeave     int    `json:"annual_leave"`
	} `json:"review"`
}

type Interview struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	Company   string `json:"company"`
	CreatedAt string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Review    struct {
		Difficulty string `json:"difficulty"`
		Position   string `json:"position"`
		Content    string `json:"content"`
		Title      string `json:"title"`
	} `json:"review"`
}

type ByCompany struct {
	Name        string `bson:"name" json:"name"`
	DomainName  string `bson:"domain" json:"id"`
	Description string `bson:"description" json:"description"`
	StaffRange  string `bson:"staff_range" json:"staff_range"`
	Score       struct {
		Overview struct {
			TotalCount int     `bson:"total_count" json:"-"` // Hidden from JSON, visible for BSON
			TotalScore float32 `bson:"total_score" json:"-"` // Hidden from JSON, visible for BSON
			Rating     float32 `bson:"-" json:"rating"`      // Calculated field for JSON only
		} `bson:"1" json:"1"`
		Salary struct {
			TotalCount int     `bson:"total_count" json:"-"`
			TotalScore float32 `bson:"total_score" json:"-"`
			Rating     float32 `bson:"-" json:"rating"`
		} `bson:"2" json:"2"`
		Benefit struct {
			TotalCount int     `bson:"total_count" json:"-"`
			TotalScore float32 `bson:"total_score" json:"-"`
			Rating     float32 `bson:"-" json:"rating"`
		} `bson:"3" json:"3"`
		Interview struct {
			TotalCount int     `bson:"total_count" json:"-"`
			TotalScore float32 `bson:"total_score" json:"-"`
			Rating     float32 `bson:"-" json:"rating"`
		} `bson:"4" json:"4"`
	} `bson:"review_score" json:"review_score"`
}
