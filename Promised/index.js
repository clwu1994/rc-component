import React, {Component} from './node_modules/react';
/**
 * @description 去掉多余的属性
 * @param {需要过滤的对象} obj 
 * @param {对于的属性名称} prop 
 */
function dissoc(obj, prop) {
  let result = {};
  for (let p in obj) {
    if (p !== prop) {
      result[p] = obj[p];
    }
  }
  return result;
}

/**
 * @description 异步请求的过程每个组件都有可能存在的逻辑，这个过程可以抽象出来
 * @param {请求的数据promise结果} promiseProp 
 * @param {需要注入功能的组件} Wrapped 
 */
const Promised = (promiseProp, Wrapped) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      value: null
    }
  }
  componentDidMount() {
    this.props[promiseProp].then(response => response.json())
      .then(value => this.setState({loading: false, value}))
      .catch(error => this.setState({loading: false, error}))
  }
  render() {
    if (this.state.loading) {
      return <span>loading...</span>
    } else if (this.state.error != null) {
      return <span>Error: {this.state.error.message}</span>
    } else {
      const propsWithoutThePromise = dissoc(this.props, promiseProp);
      return <Wrapped {...propsWithoutThePromise} {...this.state.value} />
    }
  }
}

