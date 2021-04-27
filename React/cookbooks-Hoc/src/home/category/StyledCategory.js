import styled from "styled-components";

const CategoryWrap = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 0.44rem;
		background-color: #ee742f;
		ul {
			display: flex;
			width: 1.4rem;
			height: 0.3rem;
			border-radius: 0.15rem;
			border: 1px solid #fff;
			position: relative;
			li {
				flex: 1;
				line-height: 0.3rem;
				text-align: center;
				color: #fff;
				transition: all 200ms ease-in;
				&.active {
					color: #ee742f;
					z-index: 3;
				}
				&.slide {
					position: absolute;
					left: 0;
					width: 0.7rem;
					background-color: #fff;
					height: 0.3rem;
					z-index: 2;
					border-radius: 0.15rem;
				}
				&.slide.right {
					left: 0.7rem;
				}
			}
		}
	}
`;

export { CategoryWrap };
