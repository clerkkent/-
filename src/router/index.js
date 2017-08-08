import React from 'react'
import {
  HashRouter,
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
// import 'es6-promise/dist/es6-promise'
import { Provider } from 'react-redux'
import store from '@/stores'
import Bundle from '@/components/common/Bundle'
import App from '@/containers/App'

import loadIndex from 'bundle-loader?lazy&name=[name]!@/pages/index'
import loadTopicAdd from 'bundle-loader?lazy&name=[name]!@/pages/topicAdd'
import loadTopicDetail from 'bundle-loader?lazy&name=[name]!@/pages/topicDetail'
import loadMine from 'bundle-loader?lazy&name=[name]!@/pages/mine'
import loadSystemMessage from 'bundle-loader?lazy&name=[name]!@/pages/systemMessage'
import thread from 'bundle-loader?lazy&name=[name]!@/pages/thread'
import editName from 'bundle-loader?lazy&name=[name]!@/pages/editName'
import teskList from 'bundle-loader?lazy&name=[name]!@/pages/teskList'
import collectionList from 'bundle-loader?lazy&name=[name]!@/pages/collectionList'
import comment from 'bundle-loader?lazy&name=[name]!@/pages/comment'

const Index = (props) => (
  <Bundle load={loadIndex}>
    {(Index) => <Index {...props}/>}
  </Bundle>
)
const TopicAdd = (props) => (
  <Bundle load={loadTopicAdd}>
    {(TopicAdd) => <TopicAdd {...props}/>}
  </Bundle>
)
const TopicDetail = (props) => (
  <Bundle load={loadTopicDetail}>
    {(TopicDetail) => <TopicDetail {...props}/>}
  </Bundle>
)
const Mine = (props) => (
  <Bundle load={loadMine}>
    {(Mine) => <Mine {...props}/>}
  </Bundle>
)

const Message = (props) => (
  <Bundle load={loadSystemMessage}>
    {(Message) => <Message {...props}/>}
  </Bundle>
)

const Thread = (props) => (
  <Bundle load={thread}>
    {(Thread) => <Thread {...props}/>}
  </Bundle>
)

const EditName = (props) => (
  <Bundle load={editName}>
    {(EditName) => <EditName {...props}/>}
  </Bundle>
)

const TaskList = (props) => (
  <Bundle load={teskList}>
    {(TaskList) => <TaskList {...props}/>}
  </Bundle>
)

const CollectionList = (props) => (
  <Bundle load={collectionList}>
    {(CollectionList) => <CollectionList {...props}/>}
  </Bundle>
)

const Comment = (props) => (
  <Bundle load={comment}>
    {(Comment) => <Comment {...props}/>}
  </Bundle>
)

const isPro = process.env.NODE_ENV === 'production'

const Router = isPro ? BrowserRouter : HashRouter
const basename = isPro ? '/bbs/' : '/'

const router = () => (
  <Provider store={store}>
    <Router basename={basename}>
      <App>
        <Switch>
          <Route path="/" exact={true} component={Index}/>
          <Route path="/topic/add/:id" component={TopicAdd}/>
          <Route path="/topic/detail/:id" component={TopicDetail}/>
          <Route path="/mine" component={Mine}/>
          <Route path="/message" component={Message}/>
          <Route path="/thread" component={Thread}/>
          <Route path="/editName" component={EditName}/>
          <Route path="/task" component={TaskList}/>
          <Route path="/collection" component={CollectionList}/>
          <Route path="/comment" component={Comment}/>
        </Switch>
      </App>
    </Router>
  </Provider>
)
export default router
