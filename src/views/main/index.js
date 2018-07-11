import Vue from 'vue'
// admin
import Dataauth from '../admin/auth/dataauth'
import Role from '../admin/auth/role'
import User from '../admin/auth/user'
import Workgroup from '../admin/auth/workgroup'
import Duty from '../admin/organize/duty'
import Org from '../admin/organize/org'
import Orgchart from '../admin/organize/orgchart'
import Orguser from '../admin/organize/orguser'
import Function from '../admin/system/function'
import Admindict from '../admin/system/admindict'
import Audit from '../admin/system/audit'
import Auditconfig from '../admin/system/auditconfig'
// cms
import Column from '../cms/column/index'
import Content from '../cms/content/index'
import Menu from '../cms/menu/index'
import Forum from '../message/forum/index'
import Reply from '../message/reply/index'
// gen
import Export from '../gen/export/index'
import Genealogy from '../gen/genealogy/index'
import Map from '../gen/map/index'
import Search from '../gen/search/index'
// sys
import Advert from '../sys/advert/index'
import Blogroll from '../sys/blogroll/index'
import Dict from '../sys/dict/index'
import District from '../sys/district/index'
import Setting from '../sys/setting/index'
import Station from '../sys/station/index'
// welcome
import Welcomeadmin from '../welcome/Welcomeadmin/index'
import Welcomeqiao from '../welcome/Welcomeqiao/index'

Dataauth.install(Vue)
Role.install(Vue)
User.install(Vue)
Workgroup.install(Vue)
Duty.install(Vue)
Org.install(Vue)
Orgchart.install(Vue)
Orguser.install(Vue)
Function.install(Vue)
Admindict.install(Vue)
Audit.install(Vue)
Auditconfig.install(Vue)
Column.install(Vue)
Content.install(Vue)
Menu.install(Vue)
Forum.install(Vue)
Reply.install(Vue)
Export.install(Vue)
Genealogy.install(Vue)
Map.install(Vue)
Search.install(Vue)
Advert.install(Vue)
Blogroll.install(Vue)
Dict.install(Vue)
District.install(Vue)
Setting.install(Vue)
Station.install(Vue)
Welcomeadmin.install(Vue)
Welcomeqiao.install(Vue)
