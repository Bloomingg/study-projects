import {
  Input,
  Modal as AntdModal,
  Switch,
  Form,
  DatePicker,
  TreeSelect,
  message,
  Spin,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { actionBuilder } from '..';

interface Iprops {
  visible: boolean;
  reqUrl: string;
  handleOk: () => void;
  handleClose: () => void;
}

const Modal = ({ visible, reqUrl, handleOk, handleClose }: Iprops) => {
  const [loadingForm, setLoadingForm] = useState(false);
  const { run, data } = useRequest<{ data: ModalApi.Data }>(reqUrl, {
    onSuccess: () => setLoadingForm(true),
  });
  const submit = useRequest(
    (values: any) => {
      const { method, uri, ...formData } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...formData,
          'X-API-KEY': 'antd',
          create_time: moment(formData.create_time).format(),
          update_time: moment(formData.update_time).format(),
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data.message,
          key: 'process',
        });
        handleClose();
      },
      formatResult: (res) => {
        return res;
      },
    },
  );
  const [form] = Form.useForm();

  useEffect(() => {
    setLoadingForm(false);
    if (visible) {
      run();
      form.resetFields();
    }
  }, [visible, reqUrl]);

  useEffect(() => {
    if (data && data.dataSource) {
      const formatData = {
        ...data.dataSource,
        create_time: moment(data.dataSource.create_time),
        update_time: moment(data.dataSource.update_time),
      };
      form.setFieldsValue(formatData);
    }
  }, [data]);

  const formBuilder = () => {
    return data?.layout.tabs[0].data.map((item) => {
      const basicAttr = {
        key: item.key,
        label: item.title,
        name: item.key,
      };
      switch (item.type) {
        case 'text':
          return (
            <Form.Item {...basicAttr}>
              <Input disabled={item.disabled} />
            </Form.Item>
          );
        case 'datetime':
          return (
            <Form.Item {...basicAttr}>
              <DatePicker disabled={item.disabled} showTime format={'YYYY-MM-DD HH:mm:ss'} />
            </Form.Item>
          );
        case 'tree':
          return (
            <Form.Item {...basicAttr}>
              <TreeSelect
                treeCheckable
                disabled={item.disabled}
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={item.data}
                placeholder="PleatreeDatase select"
              />
            </Form.Item>
          );
        case 'switch':
          return (
            <Form.Item {...basicAttr} valuePropName="checked">
              <Switch disabled={item.disabled} />
            </Form.Item>
          );
        default:
          return null;
      }
    });
  };

  const handleClick = (action: ModalApi.Datum3) => {
    switch (action.action) {
      case 'reset':
        form.resetFields();
        break;
      case 'cancel':
        handleClose();
        break;
      case 'submit':
        // form.setFields([
        //   { name: 'uri', value: action.uri },
        //   { name: 'method', value: action.method },
        // ]);
        const reqData = { ...form.getFieldsValue(true), uri: action.uri, method: action.method };
        submit.run(reqData);
        message.loading({
          content: 'loading...',
          key: 'process',
          duration: 0,
        });
        // form.submit();
        break;
      default:
        break;
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const initialValues = {
    create_time: moment(),
    update_time: moment(),
    status: true,
  };

  return (
    <div>
      <AntdModal
        footer={actionBuilder(data?.layout.actions[0].data, handleClick)}
        title={data?.page.title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleClose}
      >
        {loadingForm ? (
          <Form initialValues={initialValues} form={form} {...layout}>
            {formBuilder()}
          </Form>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '520px',
              height: '491px',
            }}
          >
            <Spin />
          </div>
        )}
      </AntdModal>
    </div>
  );
};

export default Modal;
