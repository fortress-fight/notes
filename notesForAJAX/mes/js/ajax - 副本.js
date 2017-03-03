            var init = ff.getHash() || 1;
            addMes(init);
            function createMessage (json) {
                var setting = {
                    infor: '初始',
                    time: '2018-09-08 16:37:60',
                    up: 0,
                    down: 0,
                    id: 0
                };
                for (attr in json) {
                    setting[attr] = json[attr];
                };
                var str = '';
                str += '\
                <div class="reply">\
                    <p class="replyContent">'+ setting.infor +'</p>\
                    <p class="operation">\
                        <span class="replyTime">'+ setting.time +'</span>\
                        <span class="handle">\
                            <a href="javascript:;" class="top">'+ setting.up +'</a>\
                            <a href="javascript:;" class="down_icon">'+ setting.down +'</a>\
                            <a href="javascript:;" class="cut"  data = "'+ setting.id +'">删除</a>\
                        </span>\
                    </p>\
                </div>'
                return str;
            }

            

            // 返回：[{id: ID, content: "内容", time: 时间戳, acc: 顶次数, ref: 踩次数}, {...}, ...]

            function addMes (num) {
                $.ajax({
                    type: "get",
                    url: "php/weibo.php",
                    data: {
                       act: "get",
                       page: num
                    },
                    success: function (data) {
                        data = eval(data);
                        var str = '';
                        for (var i = 0,con; con = data[data.length - i -1]; i++) {
                        	str += createMessage({
                                infor: con.content,
                                time: ff.setTime(con.time*1000),
                                up: 0,
                                down: 0,
                                id: con.id
                            })
                        }
//                      $.each(data, function (index, con) {
//                          
//                      })
                        $('.messList').html(str);
                    }
                })
            }

            function remove (id) {
                $.ajax({
                    type: "get",
                    url: "php/weibo.php",
                    data: {
                       act: "del",
                       id: id
                    }
                })
            }

            //weibo.php?act=acc&id=num          顶某一条数据
            function top (id) {
                $.ajax({
                    type: "get",
                    url: "php/weibo.php",
                    data: {
                       act: "acc",
                       id: id
                    },
                    success: function (data) {
                        alert('顶');
                    }
                })
            }

            //weibo.php?act=ref&id=num          踩某一条数据
            function down (id) {
                $.ajax({
                    type: "get",
                    url: "php/weibo.php",
                    data: {
                       act: "ref",
                       id: id
                    },
                    success: function (data) {
                        alert('踩');
                    }
                })
            }

            // weibo.php?act=get_page_count    获取页数

            function getPage (num) {
                var page = 0;
                $.ajax({
                    type: "get",
                    url: "php/weibo.php",
                    data: {
                       act: "get_page_count",
                    },
                    dataType: 'json',
                    success: function (data) {
                        page = data.count;
                        addMes(page);
                    }
                })
            };

            // weibo.php?act=add&content=xxx   添加一条

            $('#btn1').click(function () {
                var val = $('#tijiaoText').val().trim();
                if ((/^\s\s+\s$/).test(val) || val == ''){
                    alert('请输入内容')
                    return false;
                }
                $.ajax({
                    url: 'php/weibo.php',
                    data: {
                       act: 'add',
                       content: val
                    },
                    dataType: 'json',
                    success: function (data) {
                        // data = eval(data);
                        getPage(data.id);
                    }
                })
            })

            $('.commentOn').click(function (ev) {
                var target = ev.target;
                // console.log(target.className);
                switch (target.className) {
                    case 'cut':
                        // $(target).parents('.reply').remove();
                        remove($(target).attr('data'))
                        getPage($(target).attr('data'))
                        break;
                    case 'top':
                        top($(target).attr('data'));
                        break;
                    case 'down_icon':
                        down($(target).attr('data'));
                    default:
                        // statementass_def
                        break;
                }
            })

           /* $('#page').click(function (ev) {
                var target = ev.target;

                window.location.hash = 'page='+$(target).html();
            })*/


             $('#page').on('click','a',function (ev) {
                var target = ev.target;
                
                window.location.hash = 'page='+$(target).html();
            });

            window.onhashchange = function () {
                var index = ff.getHash();
                addMes(index);
            };
