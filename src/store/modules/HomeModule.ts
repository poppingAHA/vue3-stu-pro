import link from "../../api/Link";
import apiUrl from "../../api/url";
let HomeModule:Object={
    state:{
        navBool:true,
        dialogFormVisible:false,
        deleteDialogVisible:false,
        uplistData:{},
        deleteData:{},
        listdata:[]
    },
    mutations:{
        SET_NAV_BOOL(state:any){
            state.navBool = !state.navBool
        },
        SET_DIALOG(state:any,payload:any){
            state.dialogFormVisible=!state.dialogFormVisible
            state.uplistData=payload
        },
        SET_DELETEDIALOG(state:any,payload:any){
            state.deleteDialogVisible = !state.deleteDialogVisible;
            state.deleteData=payload;
        },
        DIALOG(state:any){
            state.dialogFormVisible=!state.dialogFormVisible
            // window.location.reload()
        },
        DELETEDIALOG(state:any){
            state.deleteDialogVisible = !state.deleteDialogVisible;
        },
        LISTDATA(state:any,payload:any){
            state.listdata=payload
        }
    },
    actions:{
        USERUPDATE_LIST(context:any){
            link(apiUrl.userlist).then((ok: any) => {
                console.log(ok);
                context.commit("LISTDATA",ok.data)
                
            });
        },
        DEL_DATA(context:any,payload:any){
            link(apiUrl.userlist+"/"+payload.id,"delete").then((ok: any) => {
                console.log(ok)
                // window.location.reload()
            });
        }
    },
    getters:{

    }
}

export default HomeModule