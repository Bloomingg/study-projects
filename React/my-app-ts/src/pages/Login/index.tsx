import { Button, Card, Divider, Form, Input } from "antd";
import styled from "@emotion/styled";
import { useToggle } from "ahooks";
// import { useHistory } from "react-router-dom";
import { useAuth } from "context/auth-context";

export const Login = () => {
	const [registerState, { toggle }] = useToggle(false);
	const auth = useAuth();
	// const history = useHistory();

	const handleSubmit = (values: any) => {
		const { username, password } = values;
		if (registerState) {
			auth.register({ username, password });
		} else {
			auth.login({ username, password });
		}
		// history.push("/table");
		// console.log(auth.user);
	};
	return (
		<Container>
			<ShadowCard>
				<Form onFinish={handleSubmit}>
					<Form.Item name="username">
						<Input placeholder="请输入用户名" />
					</Form.Item>
					<Form.Item name="password">
						<Input placeholder="请输入密码" />
					</Form.Item>
					<Button htmlType="submit" type="primary">
						{registerState ? "注册" : "登录"}
					</Button>
				</Form>
				<Divider />
				<Button type="link" onClick={() => toggle()}>
					{registerState ? "前往登录" : "前往注册"}
				</Button>
				{/* <div>{auth.user}</div> */}
			</ShadowCard>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
`;
const ShadowCard = styled(Card)`
	width: 40rem;
	min-height: 56rem;
	padding: 3.2rem 4rem;
	border-radius: 0.3rem;
	box-sizing: border-box;
	box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
	text-align: center;
	.ant-btn-primary {
		width: 100%;
	}
	.ant-btn-link {
		float: right;
	}
`;
