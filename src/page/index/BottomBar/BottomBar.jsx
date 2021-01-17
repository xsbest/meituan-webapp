/**
 * @constructor <BottomBar>
 * @description 首页底部Tab栏
 * 
 */
import './BottomBar.scss'
import React from 'react'
import { connect } from 'react-redux'
import { changeTab } from '../actions/tabActions'
class BottomBar extends React.Component {
  constructor(props) {
    super(props)
  }
  changeTabs (i) {
    this.props.dispatch(changeTab({
      activeKey: i.key
    }))
  }
  renderItems () {
    let tabs = this.props.tabs
    return (
      tabs.map((item, index) => {
        let cls = item.key + ' btn-item'
        if (item.key === this.props.activeKey) {
          cls += ' active';
        }
        return (
          <div key={index} className={cls} onClick={() => { this.changeTabs(item) }}>
            <div className="tab-icon"></div>
            <div className="btn-name">{item.name}</div>
          </div>
        )
      })
    )
  }
  render () {
    return (
      <div className="bottom-bar">
        {this.renderItems()}
      </div>)
  }
}
export default connect(
  state => ({
    tabs: state.tabReducer.tabs,
    activeKey: state.tabReducer.activeKey
  })
)(BottomBar)