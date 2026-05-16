package core

type TempMailError struct {
	IsTempMailError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTempMailError(code string, msg string, ctx *Context) *TempMailError {
	return &TempMailError{
		IsTempMailError: true,
		Sdk:              "TempMail",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TempMailError) Error() string {
	return e.Msg
}
