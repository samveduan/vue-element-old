<template>
    <div id="chart" style="height: 300px;">

    </div>
</template>

<script>
export default {
    methods: {
        drawChart(){
            let chart = this.$echarts.init(document.getElementById("chart"));
            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }]
            };
            chart.setOption(option);
        }
    },
    mounted(){
        this.drawChart();
    }
}
</script>

<style scoped>

</style>