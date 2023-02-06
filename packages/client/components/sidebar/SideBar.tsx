import { SortableTree } from './Tree/SortableTree';
import styles from './SideBar.module.scss' 
import { Group, ObjectShape } from 'packages/client/enum'

export function SideBar({
  listObject,
  setListObject,
  listGroup,
  setListGroup,
}:{
  listObject: ObjectShape[]
  setListObject: React.Dispatch<React.SetStateAction<ObjectShape[]>>
  listGroup: Group[]
  setListGroup: React.Dispatch<React.SetStateAction<Group[]>>
}) {
  return  <div className={styles.sidebar}>
<SortableTree
  collapsible={true}
  removable={true}
  listObject={listObject}
  setListObject={setListObject}
  listGroup={listGroup}
  setListGroup={setListGroup}
  ></SortableTree>
  </div>
}