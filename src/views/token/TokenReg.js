import React, { lazy, Component } from 'react'
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
  CNav,
  CNavItem,
  CNavLink,
  CListGroup,
  CListGroupItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const tokenReqAppDtlData = []
const tokenInfoData = []

const fields = ['name','registered', 'role', 'status']
const tokenReqAppDtlFields = [
  { key: 'domain', label: '도메인', _style: {width: '25%'} },
  { key: 'ip', label: 'IP', _style: {width: '25%'} },
  { key: 'createDate', label: '등록일자', _style: {width: '25%'} },
  { key: 'updateDate', label: '수정일자', _style: {width: '25%'} }
]
const tokenInfoFields = [
  { key: 'tokenType', label: '토큰타입', _style: {width: '20%'} },
  { key: 'tokenData', label: '토큰Data', _style: {width: '40%'} },
  { key: 'tokenExpDate', label: '만료일자', _style: {width: '20%'} },
  { key: 'createDate', label: '발급일자', _style: {width: '20%'} }
]

class TokenReg extends Component {
  constructor(props) {
		super(props)
		this.state = {
      step0Props: true,
      stepSrvTitle: false,
      stepCltTitle: false,
      step1Props: false,
      step2Props: false,
      step3Props: false,
      step4Props: false
		}
	}

  handleServerTokenReg = (e) => {
    e.preventDefault();
    this.setState({
      step0Props: false,
      stepSrvTitle: true,
      stepCltTitle: false,
      step1Props: true,
      step2Props: false,
      step3Props: false,
      step4Props: false
    })
  }

  handleClientTokenReg = (e) => {
    e.preventDefault();
    this.setState({
      step0Props: false,
      stepSrvTitle: false,
      stepCltTitle: true,
      step1Props: true,
      step2Props: false,
      step3Props: false,
      step4Props: false
    })
  }

  handleSave = (e) => {
    e.preventDefault();
    if(this.state.step1Props){
      this.setState({
        step1Props: false,
        step2Props: true,
        step3Props: false,
        step4Props: false
  		})
    } else if(this.state.step2Props){
      this.setState({
        step1Props: false,
        step2Props: false,
        step3Props: true,
        step4Props: false
  		})
    } else if(this.state.step3Props){
      this.setState({
        step1Props: false,
        step2Props: false,
        step3Props: false,
        step4Props: true
  		})
    }
    console.log(this.state.step1Props, this.state.step2Props, this.state.step3Props);
  }

  render(){
    const {step1Props, step2Props, step3Props, step4Props} = this.state;
    return (
      <>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              토큰정보 등록
              <div className="card-header-actions">
                <CRow>
                  <CCol xs="12" md="12">
                    <CButton color="success" size="sm" to="/tokenList">목록</CButton>
                  </CCol>
                </CRow>
              </div>
            </CCardHeader>
            <CCardBody>
              {this.state.step0Props &&
              <CRow>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="text-input">서버용 토큰발급 절차</CLabel>
                </CCol>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="text-input">클라이언트용 토큰발급 절차</CLabel>
                </CCol>
              </CRow>
              }
              {this.state.step0Props &&
              <CRow>
                <CCol xs="12" md="6">
                  <CListGroup accent>
                    <CListGroupItem accent="danger" color="light">1. 응용프로그램정보 등록</CListGroupItem>
                    <CListGroupItem accent="danger" color="light">2. 서버정보 등록</CListGroupItem>
                    <CListGroupItem accent="danger" color="light">3. 토큰정보 등록</CListGroupItem>
                    <CListGroupItem accent="danger" color="light">4. 토큰 발급</CListGroupItem>
                  </CListGroup>
                </CCol>
                <CCol xs="12" md="6">
                  <CListGroup accent>
                    <CListGroupItem accent="danger" color="light">1. 응용프로그램정보 등록</CListGroupItem>
                    <CListGroupItem accent="danger" color="light">2. 토큰정보 등록</CListGroupItem>
                    <CListGroupItem accent="danger" color="light">3. 토큰 발급</CListGroupItem>
                  </CListGroup>
                </CCol>
              </CRow>
              }
              {this.state.step0Props &&
              <CRow>
                <CCol xs="12" md="2">
                </CCol>
                <CCol xs="12" md="4">
                  <CButton color="info" size="sm" onClick={this.handleServerTokenReg}>서버용 토큰정보 등록</CButton>
                </CCol>
                <CCol xs="12" md="2">
                </CCol>
                <CCol xs="12" md="4">
                  <CButton color="info" size="sm" onClick={this.handleClientTokenReg}>클라이언트용 토큰정보 등록</CButton>
                </CCol>
              </CRow>
              }

              {this.state.stepSrvTitle &&
              <CNav fill variant="pills">
                <CNavItem>
                  <CNavLink active={this.state.step1Props}>1. 토큰정보 등록</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={this.state.step2Props}>2. 서버정보 등록</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={this.state.step3Props}>3. 토큰정보 등록</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={this.state.step4Props}>4. 토큰발급</CNavLink>
                </CNavItem>
              </CNav>
              }
              {this.state.stepCltTitle &&
              <CNav fill variant="pills">
                <CNavItem>
                  <CNavLink active={this.state.step1Props}>1. 토큰정보 등록</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={this.state.step3Props}>2. 토큰정보 등록</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={this.state.step4Props}>3. 토큰발급</CNavLink>
                </CNavItem>
              </CNav>
              }
              <hr />


              {this.state.step1Props &&
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">응용프로그램명</CLabel>
                  </CCol>
                  <CCol xs="6" md="4">
                    <CInput id="text-input" name="text-input" placeholder="응용프로그램명" />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">토큰요청자</CLabel>
                  </CCol>
                  <CCol xs="6" md="4">
                      <CInput id="text-input" name="text-input" placeholder="" />
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
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
              }
              {this.state.step2Props &&
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">도메인</CLabel>
                  </CCol>
                  <CCol xs="6" md="4">
                    <CInput id="text-input" name="text-input" placeholder="도메인" />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">IP</CLabel>
                  </CCol>
                  <CCol xs="6" md="4">
                      <CInput id="text-input" name="text-input" placeholder="IP" />
                  </CCol>
                </CFormGroup>
              </CForm>
              }

              {this.state.step3Props &&
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">토큰만료일자</CLabel>
                  </CCol>
                  <CCol xs="6" md="4">
                    <CInput id="text-input" name="text-input" placeholder="토큰만료일자" />
                  </CCol>
                </CFormGroup>
              </CForm>
              }

              {this.state.step4Props &&
              <CRow>
                <CCol md="3">
                </CCol>
                <CCol md="6">
                  <CListGroup>
                    <CListGroupItem className="justify-content-between">
                      1. 응용프로그램 등록
                      <CIcon name="cil-check" className="float-right" color="primary"/>
                    </CListGroupItem>
                    <CListGroupItem className="justify-content-between" >
                      2. 서버정보 등록
                      <CIcon name="cil-check" className="float-right" color="primary"/>
                    </CListGroupItem>
                    <CListGroupItem className="justify-content-between">
                      3. 토큰정보 등록
                      <CIcon name="cil-check" className="float-right" color="primary"/>
                    </CListGroupItem>
                    <CListGroupItem className="justify-content-between">
                      4. 토큰발급
                      <CIcon name="cil-check" className="float-right" color="primary"/>
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
                <CCol md="3">
                </CCol>
              </CRow>
              }

              <div className="card-header-actions">
                <CRow>
                  <CCol xs="12" md="12">
                    <CButton color="warning" size="sm" onClick={this.handleSave}>다음</CButton>
                  </CCol>
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {this.state.step2Props &&
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              서버정보
              <div className="card-header-actions">
                <CButton block variant="outline" color="success" size="sm">등록</CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={tokenReqAppDtlData}
                fields={tokenReqAppDtlFields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      }
      {this.state.step4Props &&
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              토큰정보
              <div className="card-header-actions">
                <CButton block variant="outline" color="warning" size="sm">발급</CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={tokenInfoData}
                fields={tokenInfoFields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                to="/tokenView"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      }

      </>
    )
  }
}

export default TokenReg
