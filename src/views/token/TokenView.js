import React, { lazy, Component } from 'react'
import queryString from 'query-string'
import axios from "axios";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CFormText,
  CSelect,
  CDataTable,
  CTextarea,
  CCollapse
} from '@coreui/react'
import tokenReqAppDtlData from './TokenReqAppDtlData'
import tokenInfoData from './TokenInfoData'

const fields = ['name','registered', 'role', 'status']
const tokenReqAppDtlFields = [
  { key: 'tokenReqApplicationDomain', label: '도메인', _style: {width: '25%'} },
  { key: 'tokenReqApplicationIp', label: 'IP', _style: {width: '25%'} },
  { key: 'createDate', label: '등록일자', _style: {width: '25%'} },
  { key: 'updateDate', label: '수정일자', _style: {width: '25%'} }
]
const tokenInfoFields = [
  { key: 'tokenClassCd', label: '토큰타입', _style: {width: '20%'} },
  { key: 'tokenData', label: '토큰Data', _style: {width: '40%'} },
  { key: 'tokenExpirationDate', label: '만료일자', _style: {width: '20%'} },
  { key: 'createDate', label: '발급일자', _style: {width: '20%'} }
]

const details = [];

class TokenView extends Component {
  constructor(props) {
		super(props)
    this.state = {
      name: '',
      userId: '',
      desc: '',
      detailList: '',
      tokenInfo: ''
    }
	}

  componentDidMount() {
     const { search } = this.props.location;
     const queryObj = queryString.parse(search);
     const { id } = queryObj;
	   console.log(id);
     this.getTokenReqApplicationViewApi(id);
     this.getTokenReqApplicationDetailListApi(id);
     this.getTokenInfoListApi(id);
	}

  getTokenReqApplicationViewApi = (id) => {
		axios.post("/api/1.0/common/service/applicationView", {
      "account" : {
          "login_id":"dev_test9",
          "auth_token":"qwgnzeouenuktmacgoxycyikdbedubveubhqsutvdywoi"
      },
      "application_id": id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-SERVICE-ID': 'HEVITON',
        'X-APP-TYPE': 'WEBAPP',
        'X-API-VERSION': '1.0',
        'X-REFERER': 1,
        'X-TERMINAL-ID': 'TERMINAL01'}
    })
		.then(res => {
			console.log(res);
			this.setState({
				name: res.data.applicationInfo.tokenReqApplicationName,
        userId: res.data.applicationInfo.tokenUserId,
        desc: res.data.applicationInfo.tokenReqApplicationDesc
			})
      console.log(this.state.info);
		})
		.catch(res => console.log(res))
	}

  getTokenReqApplicationDetailListApi = (id) => {
    axios.post("/api/1.0/common/service/applicationDetailList", {
      "account" : {
          "login_id":"dev_test9",
          "auth_token":"qwgnzeouenuktmacgoxycyikdbedubveubhqsutvdywoi"
      },
      "application_id": id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-SERVICE-ID': 'HEVITON',
        'X-APP-TYPE': 'WEBAPP',
        'X-API-VERSION': '1.0',
        'X-REFERER': 1,
        'X-TERMINAL-ID': 'TERMINAL01'}
    })
		.then(res => {
			console.log(res);
			this.setState({
				detailList: res.data.list
			})
      console.log(this.state.info);
		})
		.catch(res => console.log(res))
  }

  getTokenInfoListApi = (id) => {
    axios.post("/api/1.0/common/service/tokenInfoList", {
      "account" : {
          "login_id":"dev_test9",
          "auth_token":"qwgnzeouenuktmacgoxycyikdbedubveubhqsutvdywoi"
      },
      "application_id": id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-SERVICE-ID': 'HEVITON',
        'X-APP-TYPE': 'WEBAPP',
        'X-API-VERSION': '1.0',
        'X-REFERER': 1,
        'X-TERMINAL-ID': 'TERMINAL01'}
    })
		.then(res => {
			console.log(res);
			this.setState({
				tokenInfo: res.data.list
			})
      console.log(this.state.info);
		})
		.catch(res => console.log(res))
  }

  render() {
    return (
      <>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              토큰요청 응용프로그램 정보
              <div className="card-header-actions">
                <CRow>
                  <CCol xs="12" md="6">
                    <CButton color="warning" size="sm" >수정</CButton>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CButton color="success" size="sm" to="/tokenList">목록</CButton>
                  </CCol>
                </CRow>
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">응용프로그램명</CLabel>
                  </CCol>
                  <CCol xs="6" md="4">
                    <p className="form-control-static">{this.state.name}</p>
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">토큰요청자</CLabel>
                  </CCol>
                  <CCol xs="6" md="4">
                      <p className="form-control-static">{this.state.userId}</p>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="textarea-input">응용프로그램 설명</CLabel>
                  </CCol>
                  <CCol xs="6" md="10">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="3"
                      placeholder="Content..."
                      value={this.state.desc}
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              토큰요청 응용프로그램 서버정보
              <div className="card-header-actions">
                <CButton block variant="outline" color="success" size="sm">등록</CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={this.state.detailList}
                fields={tokenReqAppDtlFields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={5}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              토큰정보
              <div className="card-header-actions">
                <CButton block variant="outline" color="warning" size="sm">재발급</CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={this.state.tokenInfo}
                fields={tokenInfoFields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                scopedSlots = {{
                  'tokenData' :
                    (item, index)=>{
                      return (
                      <td>
                        <CButton
                           color="primary"
                           variant="outline"
                           shape="square"
                           size="sm">
                           Show
                        </CButton>
                      </td>
                      )
                    }
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      </>
    )
  }
}

export default TokenView
