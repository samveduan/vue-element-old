<template>
    <div id="chart" style="height: 300px;">

    </div>
</template>

<script>
export default {
    methods: {
        drawChart(){
            let that = this;
            this.$axios.get("http://localhost:9999/article/echart/")
            .then(function (response) {
                    let chart = that.$echarts.init(document.getElementById("chart"));
                    let option = {
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: response.data.xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: response.data.series,
                            type: 'line',
                            areaStyle: {}
                        }]
                    };
                    chart.setOption(option);
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted(){
        this.drawChart();
    }
}
</script>

<style scoped>

</style>