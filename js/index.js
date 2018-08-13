
/**
 * 活动h5
 * @param {any} options
 */
function Active(options) {
    var self = this;
    var defaults = {
        point: '',//指针
        plate: '',//表盘 
    };
    //options 合并到 defaults中
    options = $.extend(defaults, options);
    self.init = function () {
        self.windowIf();
        self.plateRotate();
        self.pageSwitch();
        //self.map();
    };
    self.windowIf = function () {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", self.pointerRotate, false);
        } else {
            console.log("dd");
            alert('当前手机不支持旋转功能哦~！');
        }
    }
    //指针旋转
    self.pointerRotate = function (event) {
        var gamma = event.gamma
        var beta = event.beta
        var alpha = event.alpha
        var deg = '';
        //传参判断
        //指针会alpha动
        if (options.point == 'alpha' && options.plate == '') {
            deg = alpha;
            $('.zhizhen').css({
                'transform': 'rotate(' + deg + 'deg)',
                'transform-origin': '.18rem bottom'
            })
        }
        //表盘会alpha动
        else if (options.point == '' && options.plate == 'alpha') {
            deg = alpha;
            $('.yuanpan').css({
                'transform': 'rotate(' + deg + 'deg)',
                //'transform-origin': '.18rem bottom'
            })
        }
        //指针表盘alpha动
        else if (options.point == 'alpha' && options.plate == 'alpha'){
            deg = alpha;
            $('.zhizhen').css({
                'transform': 'rotate(' + deg + 'deg)',
                'transform-origin': '.18rem bottom'
            })
            $('.yuanpan').css({
                'transform': 'rotate(' + deg + 'deg)',
            })
        }
        //指针重力动
        else if (options.point == 'gravity' && options.plate == '') {
            var xs = gamma / 90 * 200;
            var ys = beta / 90 * 200;
            var deg = self.angle(Math.abs(xs), Math.abs(ys));
            var deg = parseInt(deg);
            if (xs > 0 && ys > 0) {
                deg = 90 + deg + 180;
            } else if (xs > 0 && ys < 0) {
                deg = 90 - deg + 180;
            } else if (xs < 0 && ys > 0) {
                deg = 270 - deg - 180;
            } else if (xs < 0 && ys < 0) {
                deg = 270 + deg - 180;
            }
            $('.zhizhen').css({
                'transform': 'rotate(' + deg + 'deg)',
                'transform-origin': '.18rem bottom'
            })
        }
        //表盘重力动
        else if (options.point == '' && options.plate == 'gravity') {
            var xs = gamma / 90 * 200;
            var ys = beta / 90 * 200;
            var deg = self.angle(Math.abs(xs), Math.abs(ys));
            var deg = parseInt(deg);
            if (xs > 0 && ys > 0) {
                deg = 90 + deg + 180;
            } else if (xs > 0 && ys < 0) {
                deg = 90 - deg + 180;
            } else if (xs < 0 && ys > 0) {
                deg = 270 - deg - 180;
            } else if (xs < 0 && ys < 0) {
                deg = 270 + deg - 180;
            }
            $('.yuanpan').css({
                'transform': 'rotate(' + deg + 'deg)',
                //'transform-origin': '.18rem bottom'
            })
        }
        //指针表盘重力动
        else if (options.point == 'gravity' && options.plate == 'gravity') {
            var xs = gamma / 90 * 200;
            var ys = beta / 90 * 200;
            var deg = self.angle(Math.abs(xs), Math.abs(ys));
            var deg = parseInt(deg);
            if (xs > 0 && ys > 0) {
                deg = 90 + deg + 180;
            } else if (xs > 0 && ys < 0) {
                deg = 90 - deg + 180;
            } else if (xs < 0 && ys > 0) {
                deg = 270 - deg - 180;
            } else if (xs < 0 && ys < 0) {
                deg = 270 + deg - 180;
            }
            $('.zhizhen').css({
                'transform': 'rotate(' + deg + 'deg)',
                'transform-origin': '.18rem bottom'
            })
            $('.yuanpan').css({
                'transform': 'rotate(' + deg + 'deg)',
                //'transform-origin': '.18rem bottom'
            })
        }
        var year = parseInt(deg / 6) + 1958;
        document.querySelector("#dushu").innerHTML = deg;
        document.querySelector("#year").innerHTML = year;
        
        $('.year').html(parseInt(deg)+'°');
        $('.name').html('指针')
    };
    //表盘视觉差旋转
    self.plateRotate = function () {
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
    };
    //多页切换（上下翻转）
    self.pageSwitch = function () {
        var mySwiper = new Swiper('.swiper-container', {
            //autoplay: true,//可选选项，自动滑动 
            direction: 'vertical', //方向竖向
            //mousewheel: true,
            pagination: {
                el: '.swiper-pagination',
            },
            uniqueNavElements: false,
            on: {
                slideChangeTransitionStart: function (e) {
                    var pageLength = $(".swiper-pagination-bullet").length;
                    console.log(this.activeIndex);
                    if (this.activeIndex == pageLength - 1) {
                        $("#array").hide();
                        $(".bg_maisui").show();
                    }
                    else if (this.activeIndex == 0) {
                        $("#array").show();
                        $(".bg_maisui").hide();
                    } else { 
                        $("#array").show();
                        $(".bg_maisui").show();
                    }
                }
            }
        });
    };
    //百度地图
    self.map = function () {
        var map = new BMap.Map("allmap");    // 创建Map实例 
        var point = new BMap.Point(115.272973, 33.04392);//// 初始化地图,设置中心点坐标和地图级别  
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 15);
        // map.setCurrentCity("阜阳");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    };
    //根据坐标轴的位置求角度
    self.angle = function (x, y) {
        //返回角度,不是弧度
        return 360 * Math.atan(y / x) / (2 * Math.PI);
    }
    //初始化页面
    self.init();
} 