<template>
	<div class="chat">
		<div class="chat_left">
			<div class="left_top">
				<div  class="chat_userinfo">
					<img src="../assets/logo.png" alt="">
					<p class="name">嘤嘤嘤</p>
				</div>
				<input class="search" type="text" placeholder="搜索" >
			</div>
			<div class="left_bottom">
				    <ul>
				        <li v-for="item in user">
				            <img class="avatar"  width="30" height="30" :alt="item.user.name" :src="item.user.img">
				            <p class="name">{{item.user.name}}</p>
				        </li>
				    </ul>
			</div>
		</div>
		<div class="chat_right"></div>
	</div>
</template>

<script>
	export default {
		name:"chat",
		data() {
			return {
				user:[{
						name: '嘤嘤',
						img: '../assets/logo.png'
					},
					{
						name: '嘤嘤',
						img: '../assets/logo.png'
					},
					{
						name: '嘤嘤',
						img: '../assets/logo.png'
					}],
			};
		}
	}
</script>

<style scoped lang="scss"> 
.chat {
    margin: 200px auto;
    width: 800px;
    height: 600px;
    overflow: hidden;
    border-radius: 3px;
    .chat_left, .chat_rihgt {
        height: 100%;
    }
    .chat_left {
        float: left;
        width: 200px;
        color: #f4f4f4;
        background-color: #314156;
		.left_top{
			padding: 12px;
			border-bottom: solid 1px #24272C;
			.chat_userinfo{
				display: flex;
				justify-content: flex-start;
				p{
					margin-left: 10px;
				}
				img{
					width: 40px;
					height: 40px;
				}
			}
			input{
				padding: 0 10px;
				width: 100%;
				font-size: 12px;
				color: #fff;
				height: 30px;
				line-height: 30px;
				border: solid 1px #3a3a3a;
				border-radius: 4px;
				outline: none;
				background-color: #26292E;
			}
		}
    }
    .chat_rihgt {
        position: relative;
        overflow: hidden;
		background: #1482F0;
    }
//     .text {
//         position: absolute;
//         width: 100%;
//         bottom: 0;
//         left: 0;
//     }
//     .message {
//         height: ~'calc(100% - 160px)';
//     }
}
</style>
