使用方法：
```
// ...
class CommentListContainer extends Component {
  render() {
    return <Comment data={data}/>
  }
}
moudle.exports = Promised('comments', CommentListContainer);
// 此时就可以这么调用它：
React.render(<CommentListContainer comment={fetch('/api/response.json')} />, document.getElementById('root'));
```