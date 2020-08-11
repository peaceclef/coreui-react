import React, { lazy, Component } from 'react'
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
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Pagination from "react-pagination-bootstrap";

const fields = [
  { key: 'applicationName', label: '응용프로그램명', _style: {width: '20%'} },
  { key: 'applicationDomain', label: '도메인', _style: {width: '25%'} },
  { key: 'applicationIp', label: 'IP', _style: {width: '25%'} },
  { key: 'tokenCreateYn', label: '토큰생성여부', _style: {width: '10%'} },
  { key: 'tokenUserId', label: '토큰사용자ID', _style: {width: '10'} },
  { key: 'tokenCreateDate', label: '토큰등록일자', _style: {width: '10%'} }
]

class TokenList extends Component {
	constructor(props) {
		super(props)
		this.state = {
      currentPage: 1,
      applicationName: '',
      tokenCreateYn: '',
      tokenData: ''
		}
	}

  handleSearch = () => {
    this.getTokenListApi(1);
  }

  handleApplicationName = (e) => {
    this.setState({
      applicationName: e.target.value
    })
  }

  handleTokenCreateYn = (e) => {
    this.setState({
      tokenCreateYn: e.target.value
    })
  }

  handleTokenData = (e) => {
    this.setState({
      tokenData: e.target.value
    })
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({
      currentPage: pageNumber
    });
    this.getTokenListApi(pageNumber);
  }

	componentDidMount() {
		this.getTokenListApi();
	}

	getTokenListApi = (pageNumber) => {
		axios.post("/api/1.0/common/service/tokenList", {
      "account" : {
          "login_id":"dev_test9",
          "auth_token":"qwgnzeouenuktmacgoxycyikdbedubveubhqsutvdywoi"
      },
      "paging": {
          "page": pageNumber,
          "size": 10
      },
      "token":{
          "tokenReqApplicationName": this.state.applicationName,
          "tokenCreateYn": this.state.tokenCreateYn,
          "tokenData": this.state.tokenData
      }
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
				list: res.data.tokenList,
        size: res.data.pageInfo.size,
        total: res.data.pageInfo.totalCount
			})
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
                토큰정보 검색
              </CCardHeader>
              <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">응용프로그램명</CLabel>
                    </CCol>
                    <CCol xs="6" md="4">
                      <CInput id="text-input" name="text-input" value={this.state.applicationName} onChange={this.handleApplicationName} placeholder="응용프로그램명" />
                    </CCol>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">토큰발급 여부</CLabel>
                    </CCol>
                    <CCol xs="6" md="4">
                      <CSelect custom name="select" id="select" value={this.state.tokenCreateYn} onChange={this.handleTokenCreateYn} >
                        <option value="0">선택</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">토큰</CLabel>
                    </CCol>
                    <CCol xs="6" md="4">
                      <CInput id="text-input" name="text-input" placeholder="token-data" value={this.state.tokenData} onChange={this.handleTokenData} />
                    </CCol>
                    <CCol md="6">
                      <div className="card-header-actions">
                        <CButton size="sm" color="info" onClick={this.handleSearch} >검색</CButton>
                      </div>
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
                토큰정보 목록
                <div className="card-header-actions">
                  <CButton block variant="outline" color="success" size="sm" to="/tokenReg">등록</CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.list}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  scopedSlots = {{
                    'applicationName' :
                      (item)=>(
                        <td>
                          <CLink className="text-dark  px-2" to={`/tokenView?id=${item.applicationId}`} >
                            {item.applicationName}
                          </CLink>
                        </td>
                      )
                  }}
                />
                <Pagination
                  activePage={this.state.currentPage}
                  itemsCountPerPage={this.state.size}
                  totalItemsCount={this.state.total}
                  pageRangeDisplayed={10}
                  onChange={this.handlePageChange}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        </>
      )
    }
}

export default TokenList
