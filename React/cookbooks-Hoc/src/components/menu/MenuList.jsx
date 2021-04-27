import React from 'react'
import PropTypes from 'prop-types';

import { MenuWrap} from './StyledMenu'

const MenuList = (props) => {
  const {cate,curCate,onHandleAside} = props
  // console.log(props);
    return (
      <MenuWrap>
        <aside>
          <ul>
            {
              cate&&Object.keys(cate).map(ca=>{
                return (
                  <li className={curCate===ca?'active':''} key={ca} onClick={onHandleAside(ca)}><span>{ca}</span></li>
                )
              })
            }
          </ul>
        </aside>
        <section>
          <ul>
            {
              cate&&cate[curCate].map(sec=>{
                return (
                  <li key={sec}>{sec}</li>
                )
              })
            }
          </ul>
        </section>
      </MenuWrap>
    )
  }

  MenuList.propTypes = {
    cate:PropTypes.object,
    curCate:PropTypes.string
  }

  export default MenuList