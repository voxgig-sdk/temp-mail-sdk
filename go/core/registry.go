package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEmailEntityFunc func(client *TempMailSDK, entopts map[string]any) TempMailEntity

var NewMailboxEntityFunc func(client *TempMailSDK, entopts map[string]any) TempMailEntity

