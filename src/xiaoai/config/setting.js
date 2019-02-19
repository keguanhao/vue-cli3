let gbs = {
    host: ''
}
let cbs = {
    satausError(err) {
        if (err.status !== 404) {
            this.$message({
                showClose: true,
                message: '返回错误：' + err.msg,
                type: 'error'
            })
        } else {

        }
    },
    requestError(err) {
        console.log(err)
        this.$message({
            showClose: true,
            message: '请求错误：Internal Server Error',
            type: 'error'
        })
    }
}
export default {
    gbs,
    cbs
}