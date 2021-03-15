import styled from "styled-components";

const Wraper = styled.div`
	header {
		height: 0.44rem;
		line-height: 0.44rem;
		text-align: center;
		font-size: 0.16rem;
		color: #fff;
		background-color: #ee742f;
	}
`;

// 给padding-buttom一个图片高/宽比例 撑开盒子
const SwiperWrap = styled.div`
	height: 0;
	font-size: 0;
	padding-bottom: 66.666667%;
	position: relative;

	.slider.am-carousel {
		position: static !important;
	}
`;

const HotCateWrap = styled.div`
	h1 {
		height: 0.5rem;
		padding-left: 0.1rem;
		color: #666;
		line-height: 0.5rem;
		font-weight: normal;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
	}
	> div {
		background-color: #fff;
		padding-top: 0.2rem;
		.grid-item {
			img {
				width: 0.6rem;
				height: 0.6rem;
				margin-bottom: 0.04rem;
				border-radius: 0.06rem;
				&[src="blank"] {
					display: none;
				}
			}
		}
		.am-grid-item-content {
			padding: 0 !important;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
`;

export { Wraper, SwiperWrap, HotCateWrap };
