import React, { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Col,
  message,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
  Modal as AntdModal,
  Tooltip,
  Form,
  Input,
  DatePicker,
  TreeSelect,
  Select,
} from 'antd';
import styles from './index.module.less';
import { useRequest } from 'umi';
import moment from '_moment@2.29.1@moment';
import Modal from './components/Modal';
import {
  ExclamationCircleOutlined,
  SearchOutlined,
} from '_@ant-design_icons@4.6.2@@ant-design/icons';

const actionBuilder = (
  actions: BasicListApi.Action[] | BasicListApi.TableToolBar[] | ModalApi.Datum3[] | undefined,
  handleClick: (action: ModalApi.Datum3, record: any) => void,
  record?: any,
) => {
  return (actions || []).map((action: any) => {
    if (action.component === 'button') {
      return (
        <Button key={action.text} type={action.type} onClick={() => handleClick(action, record)}>
          {action.text}
        </Button>
      );
    } else {
      return null;
    }
  });
};

const BasicList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [reqUrl, setReqUrl] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { run, loading, data } = useRequest<{ data: BasicListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?page=${page}&per_page=${per_page}&sort=${sort}&order=${order}&X-API-KEY=antd`,
  );
  const deleteRecords = useRequest(
    (values: any) => {
      const { method, uri, record } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ids: record ? [record.id] : selectedRowKeys,
          'X-API-KEY': 'antd',
          type: 'delete',
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
      onError: () => {
        AntdModal.destroyAll();
      },
    },
  );
  const baseApi = 'https://public-api-v2.aspirantzhang.com';
  const authorized = '?X-API-KEY=antd';

  useEffect(() => {
    run();
  }, [page, per_page, sort, order]);

  const paginationChange = (cgPage: any, cgSize: any) => {
    setPage(cgPage);
    setPerPage(cgSize);
  };
  const handleClick = (action: ModalApi.Datum3, record: any) => {
    switch (action.action) {
      case 'modal':
        const editUrl = action.uri?.replace(/:\w+/g, (field) => record[field.replace(':', '')]);
        setReqUrl(baseApi + editUrl + authorized);
        setVisible(true);
        break;
      case 'delete':
        // deleteRecords.run({ method: action.method, uri: action.uri });
        AntdModal.confirm({
          title: 'Are you sure delete this admin?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Sure to Delete!!!',
          okType: 'danger',
          cancelText: 'Cancel',
          onOk() {
            return deleteRecords.run({ method: action.method, uri: action.uri, record });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;
      default:
        setReqUrl(baseApi + action.uri + authorized);
        setVisible(true);
        break;
    }
  };
  const handleClose = () => {
    setVisible(false);
  };

  const searchBuilder = () => {
    return data?.layout.tableColumn.map((item) => {
      const basicAttr = {
        key: item.key,
        label: item.title,
        name: item.key,
      };
      switch (item.type) {
        case 'text':
          return (
            <Col sm={6}>
              <Form.Item {...basicAttr}>
                <Input disabled={item.disabled} />
              </Form.Item>
            </Col>
          );
        case 'datetime':
          return (
            <Col sm={6}>
              <Form.Item {...basicAttr}>
                <DatePicker.RangePicker
                  showTime
                  format={'YYYY-MM-DD HH:mm:ss'}
                  ranges={{
                    Today: [moment().startOf('day'), moment().endOf('day')],
                    'Last 7 Days': [moment().subtract(7, 'd'), moment()],
                    'Last 30 Days': [moment().subtract(30, 'd'), moment()],
                    'Last Month Days': [
                      moment().subtract(1, 'months').startOf('month'),
                      moment().subtract(1, 'months').endOf('month'),
                    ],
                  }}
                />
              </Form.Item>
            </Col>
          );
        case 'tree':
          return (
            <Col sm={6}>
              <Form.Item {...basicAttr}>
                <TreeSelect
                  treeCheckable
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={item.data}
                  placeholder="PleatreeDatase select"
                />
              </Form.Item>
            </Col>
          );
        case 'switch':
          return (
            <Col sm={6}>
              <Form.Item {...basicAttr}>
                <Select style={{ width: '100%' }}>
                  <Select.Option value={0}>enable</Select.Option>
                  <Select.Option value={1}>unable</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          );
        default:
          return null;
      }
    });
  };

  const searchLayout = () => (
    <Card className={styles.searchForm}>
      <Form>
        <Row gutter={24}>{searchBuilder()}</Row>
      </Form>
    </Card>
  );

  const beforeTableLayout = () => {
    return (
      <Row className={styles.tools}>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.toolsRight}>
          <Space>
            <Tooltip title="search">
              <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            {actionBuilder(data?.layout?.tableToolBar, handleClick)}
          </Space>
        </Col>
      </Row>
    );
  };

  const afterTableLayout = () => {
    return (
      <Row className={styles.tools}>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.toolsRight}>
          <Pagination
            onChange={paginationChange}
            onShowSizeChange={paginationChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `total ${total} items`}
            total={data?.meta?.total || 0}
            pageSize={data?.meta?.per_page || 10}
            current={data?.meta?.page || 1}
          />
        </Col>
      </Row>
    );
  };

  const columnsBuilder = (tableColumn: BasicListApi.TableColumn[] | undefined) => {
    let newCol: BasicListApi.TableColumn[] = [];
    (tableColumn || []).forEach((col) => {
      if (!col.hideInColumn) {
        switch (col.type) {
          case 'switch':
            col.render = (value: number) => {
              const option = (col.data || []).find((v) => v.value === value);
              return <Tag color={option?.value ? 'blue' : 'red'}>{option?.title}</Tag>;
            };
            break;
          case 'datetime':
            col.render = (value: string) => {
              return moment(value).format('YYYY-MM-DD HH:mm:ss');
            };
            // col.sorter = (a, b) => {};
            break;
          case 'actions':
            col.render = (_: any, record: any) => {
              return <Space>{actionBuilder(col.actions, handleClick, record)}</Space>;
            };
            break;
          default:
            break;
        }
        newCol.push(col);
      }
    });
    const idCol = [{ title: 'ID', key: 'id', dataIndex: 'id', sorter: true }];
    const fullCol = idCol.concat(newCol);
    return fullCol;
  };

  const footerToolbar = () => {
    return (
      selectedRowKeys.length > 0 && (
        <Space>{actionBuilder(data?.layout.batchToolBar, handleClick)}</Space>
      )
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: any) => {
      setSelectedRowKeys(_selectedRowKeys);
    },
  };

  const tableChange = (pagination: any, filter: any, sorter: any) => {
    switch (sorter.order) {
      case 'ascend':
        setSort(sorter.field);
        setOrder('asc');
        break;
      case 'descend':
        setSort(sorter.field);
        setOrder('desc');
        break;
      case undefined:
        setSort('');
        setOrder('');
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <Card>
        {searchLayout()}
        {beforeTableLayout()}
        <Table
          rowKey="id"
          loading={loading}
          columns={columnsBuilder(data?.layout?.tableColumn)}
          dataSource={data?.dataSource}
          pagination={false}
          onChange={tableChange}
          rowSelection={rowSelection}
        />
        {afterTableLayout()}
      </Card>
      <Modal
        visible={visible}
        reqUrl={reqUrl}
        handleOk={() => setVisible(false)}
        handleClose={handleClose}
      />
      <FooterToolbar extra={footerToolbar()} />
    </PageContainer>
  );
};

export { actionBuilder };
export default BasicList;
