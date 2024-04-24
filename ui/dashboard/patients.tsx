'use client'
import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { db } from '@/lib/db';

interface Patient {
  key: React.Key;
  firstname: string;
  lastname: string;
  patientId: string;
}

const columns: TableColumnsType<Patient> = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
  },
  {
    title: 'Patient ID',
    dataIndex: 'patientId',
  },
];

const data: Patient[] = [
  {
    key: '1',
    firstname: 'John',
    lastname: 'Brown',
    patientId: '111111',
  },
  {
    key: '2',
    firstname: 'Jim',
    lastname: 'Green',
    patientId: '222222',
  },
  {
    key: '3',
    firstname: 'Joe',
    lastname: 'Black',
    patientId: '333333',
  },
  {
    key: '4',
    firstname: 'Disabled',
    lastname: 'User',
    patientId: '444444',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: async (selectedRowKeys: React.Key[], selectedRows: Patient[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    const resp = await fetch('/api/getUser',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  console.log("Patient resp: ", resp)
  },
  getCheckboxProps: (record: Patient) => ({
    disabled: record.firstname === 'Disabled' && record.lastname === 'User', // Column configuration not to be checked
    firstname: record.firstname,
    lastname: record.lastname,
  }),
};

const users = async () => {
  const resp = await db.user.findMany({
  orderBy: {
    createdAt: 'desc',
  },
  })
  console.log(resp)
  return resp
}

const Patients = () => {
  const selectionType = 'radio'
  const user = users()

  return (
    <div>
      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Patients;