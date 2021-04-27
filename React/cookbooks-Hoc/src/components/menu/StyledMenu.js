import styled from "styled-components";

const MenuWrap = styled.div`
	overflow: hidden;
	flex: 1;
	display: flex;
	aside {
		width: 0.9rem;
		overflow-y: scroll;
		ul {
			li {
				height: 0.5rem;
				text-align: center;
				line-height: 0.5rem;
				&.active {
					background-color: #fff;
					color: #ee742f;
					span {
						display: inline-block;
						height: 100%;
						border-bottom: solid 1px #ee742f;
					}
				}
			}
		}
	}
	section {
		flex: 1;
		padding: 0.25rem;
		background-color: #fff;
		overflow-y: scroll;
		ul {
			display: flex;
			flex-wrap: wrap;
			li {
				width: 33.33333%;
				height: 0.45rem;
				text-align: center;
			}
		}
	}
`;

export { MenuWrap };
