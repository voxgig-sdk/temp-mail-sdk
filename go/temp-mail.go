package voxgigtempmailsdk

import (
	"github.com/voxgig-sdk/temp-mail-sdk/go/core"
	"github.com/voxgig-sdk/temp-mail-sdk/go/entity"
	"github.com/voxgig-sdk/temp-mail-sdk/go/feature"
	_ "github.com/voxgig-sdk/temp-mail-sdk/go/utility"
)

// Type aliases preserve external API.
type TempMailSDK = core.TempMailSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TempMailEntity = core.TempMailEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TempMailError = core.TempMailError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEmailEntityFunc = func(client *core.TempMailSDK, entopts map[string]any) core.TempMailEntity {
		return entity.NewEmailEntity(client, entopts)
	}
	core.NewMailboxEntityFunc = func(client *core.TempMailSDK, entopts map[string]any) core.TempMailEntity {
		return entity.NewMailboxEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTempMailSDK = core.NewTempMailSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTempMailSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TempMailSDK  { return NewTempMailSDK(nil) }
func Test() *TempMailSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
