import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
    return moment(input).format(formatStr)
})


// import Vue from 'vue'
// import abc from 'abc'

// Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
//     return abc(input).format(formatStr)
// })










