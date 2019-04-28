var featuredValue=12000;
var specialValue=12000;
var classRecommendValue=15000;
var detailValue=12000;
var salt="1q2w3e";
var steam=
    {
        //精选
        featuredLeft:$('#featured-left'),
        featuredRight:$('#featured-right'),
        //特殊推荐
        specialLeft:$('#specialleft'),
        specialRight:$('#specialright'),
        featuredTimer:null,

        classLeft:$('#genre_large_cluster .arrow.left'),
        classRight:$('#genre_large_cluster .arrow.right'),
        classTimer:null,

        detailLeft:$('#highlight_slider_left'),
        detailRight:$('#highlight_slider_right'),
        detailTimer:null,

        init:function() {
            var that = this;
            this.showFeturedData();
            this.featuredLeft.click(function () {
                that.featuredLeftCarouselLeft();
            });
            this.featuredRight.click(function () {
                that.featuredLeftCarouselRight();
            });
            this.specialLeft.click(function () {
                that.specialLeftCarousel();
            });
            this.specialRight.click(function () {
                that.specialRightCarousel();
            });
            this.classLeft.click(function () {
                that.classLeftCarousel();
            });
            this.classRight.click(function () {
                that.classRightCarousel();
            });
            this.detailLeft.click(function () {
                that.detailCarouselLeft();
            });
            this.detailRight.click(function () {
                that.detailCarouselRight();
            });
            this.featuredLeftCarouselStart(that);
            //console.log(this.timer);
            this.mouseFeturedCarouselPause(that);
            this.mouseChangeImage();
            this.mouseTabPause();
            this.classCarouselStart(that);
            this.mouseClassCarouselPause(that);
            this.mouseClassListPause();
            this.detailCarouselStart(that);
            this.mouseDetailPause(that);
        },

        showFeturedData:function(){
            $.ajax({
                url:"/feturedCarousel",
                type:"POST",
                async:false,
                data:{

                },
                success:function (data) {
                    data=eval('('+data+')');
                    $('#featuredCarousel').empty();
                    if (data.code == 200){
                        console.log(data)
                        for (var i=0;i<data.msg.length;i++){
                            console.log(i)
                            var parent;
                            if (i == 0){
                                parent='<a class="store_main_capsule broadcast_capsule app_impression_tracked focus" href="';
                            }else{
                                parent='<a class="store_main_capsule broadcast_capsule app_impression_tracked" href="';
                            }
                            parent+='/app/'+data.msg[i].id;
                            parent+='"></a>';
                            //存贮四张介绍图信息
                            var elementChild1='<div class="capsule main_capsule" data-background-image-url="';
                            elementChild1+=data.msg[i].posterImage;
                            elementChild1+='" style="background-image: url(&quot;';
                            elementChild1+=data.msg[i].posterImage;
                            elementChild1+='&quot;);"><div class="screenshot" data-background-image-url="';
                            elementChild1+=data.msg[i].imageIntro1;
                            elementChild1+='" style="background-image: url(&quot;';
                            elementChild1+=data.msg[i].imageIntro1;
                            elementChild1+='&quot;);"></div><div class="screenshot" data-background-image-url="';
                            elementChild1+=data.msg[i].imageIntro2;
                            elementChild1+='" style="background-image: url(&quot;';
                            elementChild1+=data.msg[i].imageIntro2;
                            elementChild1+='&quot;);"></div><div class="screenshot" data-background-image-url="';
                            elementChild1+=data.msg[i].imageIntro3;
                            elementChild1+='" style="background-image: url(&quot;';
                            elementChild1+=data.msg[i].imageIntro3;
                            elementChild1+='&quot;);"></div><div class="screenshot"data-background-image-url="';
                            elementChild1+=data.msg[i].imageIntro4;
                            elementChild1+='" style="background-image: url(&quot;';
                            elementChild1+=data.msg[i].imageIntro4;
                            elementChild1+='&quot;);"></div></div>';
                            //游戏信息
                            var elementChild2='<div class="info"><div class="app_name"><div>';
                            elementChild2+=data.msg[i].gameName;
                            elementChild2+='</div></div></div>';
                            //四张介绍图
                            var intro='<div class="screenshots"><div><div data-background-image-url="';
                            intro+=data.msg[i].imageIntro1;
                            intro+='" style="background-image: url(&quot;';
                            intro+=data.msg[i].imageIntro1;
                            intro+='&quot;);"></div></div><div><div data-background-image-url="';
                            intro+=data.msg[i].imageIntro2;
                            intro+='" style="background-image: url(&quot;';
                            intro+=data.msg[i].imageIntro2;
                            intro+='&quot;);"></div></div><div><div data-background-image-url="';
                            intro+=data.msg[i].imageIntro3;
                            intro+='" style="background-image: url(&quot;';
                            intro+=data.msg[i].imageIntro3;
                            intro+='&quot;);"></div></div><div><div data-background-image-url="';
                            intro+=data.msg[i].imageIntro4;
                            intro+='" style="background-image: url(&quot;';
                            intro+=data.msg[i].imageIntro4;
                            intro+='&quot;);"></div></div></div>';
                            //热销
                            var hotseller='<div class="reason"><div class="main default">';
                            if (data.msg[i].issuedStatu==1){
                                hotseller+='现已推出';
                            }else {
                                hotseller+='立即预购';
                            }
                            hotseller+='</div><div class="additional"><div>热销商品</div></div></div>';
                            //折扣
                            var discount='<div class="discount_block  discount_block_inline" data-price-final="6500"><div class="discount_pct">';
                            discount+='-'+data.msg[i].discount+'%';
                            discount+='</div><div class="discount_prices"><div class="discount_original_price">';
                            discount+='¥ '+data.msg[i].gamePrice;
                            discount+='</div><div class="discount_final_price">';
                            discount+='¥ '+data.msg[i].gamePrice;
                            discount+='</div></div></div>';
                            //平台
                            var platform='<div class="platforms"><span class="platform_img win"></span></div>'

                            var parent=$(parent);
                            var element1=$(elementChild1);
                            var element2=$(elementChild2);
                            var intro=$(intro);
                            var hotseller=$(hotseller);
                            var discount=$(discount);
                            var platform=$(platform);
                            element2.append(intro,hotseller,discount,platform);
                            parent.append(element1,element2);
                            $('#featuredCarousel').append(parent);
                        }

                    }

                },
                error:function () {
                    layer.msg('网络错误')
                }
            })
        },

        mouseDetailPause:function(th){
            $('#detailPause').hover(function () {
                window.clearInterval(th.detailTimer);
            },function () {
                th.detailCarouselStart(th);
            });
        },

        detailCarouselStart:function(th){
            th.detailTimer=setInterval(function () {
                th.detailCarouselRight();
            },7000);
        },

        detailCarouselRight:function(){
            $('#highlight_player_area div.highlight_player_item.highlight_screenshot')[detailValue%5].setAttribute('style','display: none;');
            $('#highlight_player_area div.highlight_player_item.highlight_screenshot')[(detailValue+1)%5].setAttribute('style','display: block;');
            $('#highlight_strip_scroll div.highlight_strip_item.highlight_strip_screenshot')[detailValue%5].setAttribute('class','highlight_strip_item highlight_strip_screenshot');
            $('#highlight_strip_scroll div.highlight_strip_item.highlight_strip_screenshot')[(detailValue+1)%5].setAttribute('class','highlight_strip_item highlight_strip_screenshot focus');
            var index=(detailValue+1)%5*120;
            index='left:'+index+'px;';
            $('#highlight_strip_scroll div.highlight_selector')[0].setAttribute('style',index);
            detailValue++;
        },

        detailCarouselLeft:function(){
            $('#highlight_player_area div.highlight_player_item.highlight_screenshot')[detailValue%5].setAttribute('style','display: none;');
            $('#highlight_player_area div.highlight_player_item.highlight_screenshot')[(detailValue-1)%5].setAttribute('style','display: block;');
            $('#highlight_strip_scroll div.highlight_strip_item.highlight_strip_screenshot')[detailValue%5].setAttribute('class','highlight_strip_item highlight_strip_screenshot');
            $('#highlight_strip_scroll div.highlight_strip_item.highlight_strip_screenshot')[(detailValue-1)%5].setAttribute('class','highlight_strip_item highlight_strip_screenshot focus');
            var index=(detailValue-1)%5*120;
            index='left:'+index+'px;';
            $('#highlight_strip_scroll div.highlight_selector')[0].setAttribute('style',index);
            detailValue--;
        },

        mouseClassListPause:function(){
            var height=null;
            $('#mouseClassListPause div div div>a[class *="tab_item"]').hover(function () {
                var newStyle=$('#global_hover')[0].getAttribute('style').replace('display: none;','display: block;');
                $('#global_hover')[0].setAttribute('style',newStyle);
                var index=$('#mouseClassListPause div div div>a[class *="tab_item"]').index(this);
                height=(index%15)*74+664;
                //top: 664px;
                height='top: '+height+'px;';
                newStyle=$('#global_hover')[0].getAttribute('style').replace('top: 664px;',height);
                $('#global_hover')[0].setAttribute('style',newStyle);
            },function () {
                var newStyle=$('#global_hover')[0].getAttribute('style').replace('display: block;','display: none;');
                newStyle=newStyle.replace(height,'top: 664px;');
                $('#global_hover')[0].setAttribute('style',newStyle);
            });
        },

        classCarouselStart:function(th){
            th.classTimer=setInterval(function () {
                th.classRightCarousel();
            },7000);
        },

        mouseClassCarouselPause:function(th){
            $('#genre_large_cluster').hover(function () {
                window.clearInterval(th.classTimer);
            },function () {
                th.classCarouselStart(th);
            });
        },

        classRightCarousel:function(){
            $('#genre_large_cluster .carousel_items.store_capsule_container>a')[classRecommendValue%15].setAttribute('class','');
            $('#genre_large_cluster .carousel_items.store_capsule_container>a')[(classRecommendValue+1)%15].setAttribute('class','focus');
            $('#genre_large_cluster .carousel_thumbs>div')[classRecommendValue%15].setAttribute('class','');
            $('#genre_large_cluster .carousel_thumbs>div')[(classRecommendValue+1)%15].setAttribute('class','focus');
            classRecommendValue++;
        },

        classLeftCarousel:function(){
            $('#genre_large_cluster .carousel_items.store_capsule_container>a')[classRecommendValue%15].setAttribute('class','');
            $('#genre_large_cluster .carousel_items.store_capsule_container>a')[(classRecommendValue-1)%15].setAttribute('class','focus');
            $('#genre_large_cluster .carousel_thumbs>div')[classRecommendValue%15].setAttribute('class','');
            $('#genre_large_cluster .carousel_thumbs>div')[(classRecommendValue-1)%15].setAttribute('class','focus');
            classRecommendValue--;
        },

        mouseTabPause:function(){
            var indexPreNewReleases=0;
            var indexPreHotSeller=0;
            var indexUpComing=0;
            $('#tab_newreleases_content>a').hover(function () {
                var classValue=$(this)[0].getAttribute('class');
                if (classValue.indexOf('focus')!=-1)
                    return;
                var indexNext=$('#tab_newreleases_content>a').index(this);
                $('#tab_newreleases_content>a').eq(indexPreNewReleases)[0].setAttribute('class','tab_item app_impression_tracked');
                $(this)[0].setAttribute('class','tab_item app_impression_tracked focus');
                indexPreNewReleases=indexNext;
            },function () {
            });

            $('#tab_topsellers_content>a').hover(function () {
                var classValue=$(this)[0].getAttribute('class');
                if (classValue.indexOf('focus')!=-1)
                    return;
                var indexNext=$('#tab_topsellers_content>a').index(this);
                $('#tab_topsellers_content>a').eq(indexPreHotSeller)[0].setAttribute('class','tab_item app_impression_tracked');
                $(this)[0].setAttribute('class','tab_item app_impression_tracked focus');
                indexPreHotSeller=indexNext;
            },function () {
            });

            $('#tab_upcoming_content>a').hover(function () {
                var classValue=$(this)[0].getAttribute('class');
                if (classValue.indexOf('focus')!=-1)
                    return;
                var indexNext=$('#tab_upcoming_content>a').index(this);
                $('#tab_upcoming_content>a').eq(indexUpComing)[0].setAttribute('class','tab_item app_impression_tracked');
                $(this)[0].setAttribute('class','tab_item app_impression_tracked focus');
                indexUpComing=indexNext;
            },function () {
            });
        },

        homeTabSelect:function(tab){
            var newRelease=$('#tab_newreleases_content_trigger')[0].getAttribute('class');
            var hotSell=$('#tab_topsellers_content_trigger')[0].getAttribute('class');
            var upComing=$('#tab_upcoming_content_trigger')[0].getAttribute('class');
            if (newRelease.indexOf('active')!=-1){
                $('#tab_newreleases_content_trigger')[0].setAttribute('class','home_tab');
                $('#tab_newreleases_content')[0].setAttribute('style','display: none;');
                $('#tab_upcoming_content')[0].setAttribute('style','display: none;');
                $('#tab_topsellers_content')[0].setAttribute('style','display: none;');
            }
            if (hotSell.indexOf('active')!=-1){
                $('#tab_topsellers_content_trigger')[0].setAttribute('class','home_tab');
                $('#tab_newreleases_content')[0].setAttribute('style','display: none;');
                $('#tab_upcoming_content')[0].setAttribute('style','display: none;');
                $('#tab_topsellers_content')[0].setAttribute('style','display: none;');
            }
            if (upComing.indexOf('active')!=-1){
                $('#tab_upcoming_content_trigger')[0].setAttribute('class','home_tab');
                $('#tab_newreleases_content')[0].setAttribute('style','display: none;');
                $('#tab_upcoming_content')[0].setAttribute('style','display: none;');
                $('#tab_topsellers_content')[0].setAttribute('style','display: none;');
            }
            if (tab == 'tab_newreleases_content'){
                $('#tab_newreleases_content_trigger')[0].setAttribute('class','home_tab active');
                $('#tab_newreleases_content')[0].setAttribute('style','');
            }
            if (tab == 'tab_topsellers_content'){
                $('#tab_topsellers_content_trigger')[0].setAttribute('class','home_tab active');
                $('#tab_topsellers_content')[0].setAttribute('style','');
            }
            if (tab == 'tab_upcoming_content'){
                $('#tab_upcoming_content_trigger')[0].setAttribute('class','home_tab active');
                $('#tab_upcoming_content')[0].setAttribute('style','');
            }
        },

        mouseFeturedCarouselPause:function(th){
            $('#home_maincap_v7').hover(function () {
                window.clearInterval(th.featuredTimer)
            },function () {
                th.featuredLeftCarouselStart(th)
            });
        },

        mouseChangeImage:function(){
            //var length=$('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked div.info .screenshots>div>div').length;
            $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked div.info .screenshots>div').mouseover(function(){
                var imageUrl=$(this).children('div')[0].getAttribute('data-background-image-url');
                var url='background-image:url("'+imageUrl+'")';
                //console.log($(this).children('div')[0].getAttribute('data-background-image-url'))
                $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked.focus>div.capsule.main_capsule')[0].setAttribute('style',url);
            }).mouseout(function(){
                var imageUrl=$('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked.focus>div.capsule.main_capsule')[0].getAttribute('data-background-image-url');
                var url='background-image:url("'+imageUrl+'")';
                $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked.focus>div.capsule.main_capsule')[0].setAttribute('style',url);
            });
        },

        featuredLeftCarouselRight:function(){
           var right= $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked');
           var oldElement=right[(featuredValue)%12].getAttribute('class');
           var newElement=right[(featuredValue+1)%12].getAttribute('class');
           oldElement=oldElement.replace('focus','');
           newElement=newElement.concat(' focus')
           $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked')[(featuredValue)%12].setAttribute('class',oldElement);
           $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked')[(featuredValue+1)%12].setAttribute('class',newElement);
           var thumbs=$('#featuredCarousel_thumbs div');
           oldElement=thumbs[featuredValue%12].getAttribute('class');
           newElement=thumbs[(featuredValue+1)%12].getAttribute('class');
           oldElement=oldElement.replace('focus','');
           newElement=newElement.concat('focus');
           $('#featuredCarousel_thumbs div')[featuredValue%12].setAttribute('class',oldElement);
           $('#featuredCarousel_thumbs div')[(featuredValue+1)%12].setAttribute('class',newElement);
           featuredValue++;
        },


        featuredLeftCarouselLeft:function(){
            var right= $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked');
            var oldElement=right[(featuredValue)%12].getAttribute('class');
            var newElement=right[(featuredValue-1)%12].getAttribute('class');
            oldElement=oldElement.replace('focus','');
            newElement=newElement.concat(' focus')
            $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked')[(featuredValue)%12].setAttribute('class',oldElement);
            $('#featuredCarousel a.store_main_capsule.broadcast_capsule.app_impression_tracked')[(featuredValue-1)%12].setAttribute('class',newElement);
            var thumbs=$('#featuredCarousel_thumbs div');
            oldElement=thumbs[featuredValue%12].getAttribute('class');
            newElement=thumbs[(featuredValue-1)%12].getAttribute('class');
            oldElement=oldElement.replace('focus','');
            newElement=newElement.concat('focus');
            $('#featuredCarousel_thumbs div')[featuredValue%12].setAttribute('class',oldElement);
            $('#featuredCarousel_thumbs div')[(featuredValue-1)%12].setAttribute('class',newElement);
            featuredValue--;
        },


        featuredLeftCarouselStart:function (th) {
            th.featuredTimer=setInterval(this.featuredLeftCarouselRight,7000);
        },

        specialRightCarousel:function () {
            var right= $('#specialCarous>div');
            var oldElement=right[(specialValue)%2].getAttribute('class');
            var newElement=right[(specialValue+1)%2].getAttribute('class');
            if (newElement==undefined)
                newElement='';
            oldElement=oldElement.replace('focus','');
            newElement=newElement.concat('focus')
            $('#specialCarous>div')[(specialValue)%2].setAttribute('class',oldElement);
            $('#specialCarous>div')[(specialValue+1)%2].setAttribute('class',newElement);
            var thumbs=$('#special_thumbs div');
            oldElement=thumbs[specialValue%2].getAttribute('class');
            newElement=thumbs[(specialValue+1)%2].getAttribute('class');
            if (newElement==undefined)
                newElement='';
            oldElement=oldElement.replace('focus','');
            newElement=newElement.concat('focus');
            $('#special_thumbs div')[specialValue%2].setAttribute('class',oldElement);
            $('#special_thumbs div')[(specialValue+1)%2].setAttribute('class',newElement);
            specialValue++;
        },

        specialLeftCarousel:function () {
            var right= $('#specialCarous>div');
            var oldElement=right[(specialValue)%2].getAttribute('class');
            var newElement=right[(specialValue-1)%2].getAttribute('class');
            if (newElement==undefined)
                newElement='';
            oldElement=oldElement.replace('focus','');
            newElement=newElement.concat(' focus')
            $('#specialCarous>div')[(specialValue)%2].setAttribute('class',oldElement);
            $('#specialCarous>div')[(specialValue-1)%2].setAttribute('class',newElement);
            var thumbs=$('#special_thumbs div');
            oldElement=thumbs[specialValue%2].getAttribute('class');
            newElement=thumbs[(specialValue-1)%2].getAttribute('class');
            if (newElement==undefined)
                newElement='';
            oldElement=oldElement.replace('focus','');
            newElement=newElement.concat('focus');
            $('#special_thumbs div')[specialValue%2].setAttribute('class',oldElement);
            $('#special_thumbs div')[(specialValue-1)%2].setAttribute('class',newElement);
            specialValue--;
        },

    }

    steam.init();
    //steam.featuredLeftCarouselStart();

    //主页切换选项
    function HomeTabSelect(tab) {
        steam.homeTabSelect(tab);
    }

    //展示菜单
    function showMenu() {
        var value=$('#account_dropdown')[0].getAttribute('style');
        if (value.indexOf('display: none;')!=-1) {
            value=value.replace('display: none;','');
            $('#account_dropdown')[0].setAttribute('style',value);
        }else {
            value=value.concat('display: none;');
            $('#account_dropdown')[0].setAttribute('style',value);
        }
    }

    //倒计时
    function countDown(endTime,id){
        // console.log()
        var start = new Date();  //开始时间
        var end = new Date(endTime);//结束时间，可以设置时间
        //parseInt()取整
        var result = parseInt((end.getTime()-start.getTime())/1000);//计算秒
        //var d = parseInt(result/(24*60*60));//用总共的秒数除以1天的秒数
        var h = parseInt(result/(60*60));//精确小时，用去余
        var m = parseInt(result/60%60);//剩余分钟就是用1小时等于60分钟进行趣余
        var s = parseInt(result%60);
        var times=h+':'+m+':'+s;
       if (id=='captchaRefreshLink'){
           $('#captchaRefreshLink')[0].setAttribute('value',times);
       }
       if (id=='dailydeal_timer_b9523fb88ff59a2dd944e424') {
           //console.log($('#dailydeal_timer_b9523fb88ff59a2dd944e424'))
            $('#dailydeal_timer_b9523fb88ff59a2dd944e424')[0].innerHTML = times;
           //document.getElementById('dailydeal_timer_b9523fb88ff59a2dd944e424').innerHTML(times);
       }
        setTimeout(countDown,500,endTime,id);
        //当倒计时结束时，改变内容
        if(result<=0){

        }
    }

    function classTabSelect(selects) {
        $('#tab_select_NewReleases')[0].setAttribute('class','tab  tab_filler');
        $('#tab_select_TopSellers')[0].setAttribute('class','tab  tab_filler');
        $('#tab_select_ComingSoon')[0].setAttribute('class','tab  tab_filler');
        $('#tab_content_NewReleases')[0].setAttribute('style','display: none;');
        $('#tab_content_TopSellers')[0].setAttribute('style','display: none;');
        $('#tab_content_ComingSoon')[0].setAttribute('style','display: none;');
        if (selects == 'NewReleases'){
            $('#tab_select_NewReleases')[0].setAttribute('class','tab  tab_filler active');
            $('#tab_content_NewReleases')[0].setAttribute('style','display: block;');
        }
        if (selects == 'TopSellers'){
            $('#tab_select_TopSellers')[0].setAttribute('class','tab  tab_filler active');
            $('#tab_content_TopSellers')[0].setAttribute('style','display: block;');
        }
        if (selects == 'ComingSoon'){
            $('#tab_select_ComingSoon')[0].setAttribute('class','tab  tab_filler active');
            $('#tab_content_ComingSoon')[0].setAttribute('style','display: block;');
        }
    }

    //展示更多发行商
    function showMorePublisher() {
        $('#publisherValue .summary.column')[0].setAttribute('style','overflow: visible; white-space: normal;');
        $('#publisherValue .more_btn')[0].setAttribute('style','display:none;');
    }

    //登录操作
    function login() {
        var email=$('#input_username').val();
        var password=$('#input_password').val();
        password=""+salt.charAt(0)+salt.charAt(4)+password+salt.charAt(5)+salt.charAt(2);
        password=md5(password);
        var loadId=layer.load(1, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            url:"/userVerification",
            type:"POST",
            data:{
              email:email,
              password:password  
            },
            success:function (data) {
                layer.close(loadId);
                data=eval('('+data+')');
                if (data.code==201){
                    layer.msg(data.msg)
                    window.location.href="/";
                }
                if (data.code==501) {
                    layer.msg(data.msg)
                }
                if (data.code==502){
                    layer.msg(data.msg)
                }
                if (data.code==503) {
                    layer.msg(data.msg);
                }

            },
            error:function () {
                layer.close(loadId);
                layer.msg("网络错误");
            }
        });
    }