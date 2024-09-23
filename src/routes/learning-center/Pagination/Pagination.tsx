import classNames from 'classnames'
// import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

interface IPagination {
  className?: string
}

// const Pagination = ({ className, ...props }: IPagination) => {
const Pagination = ({ className }: IPagination) => {
  return (
    <div className={classNames(styles['pagination'], className)}>
      {/*<ReactPaginate*/}
      {/*  {...props}*/}
      {/*  className={styles['pagination-panel']}*/}
      {/*  pageCount={9}*/}
      {/*  onPageChange={(page) => console.log('page ', page)}*/}
      {/*  renderOnZeroPageCount={null}*/}
      {/*  pageRangeDisplayed={2}*/}
      {/*  nextLabel={null}*/}
      {/*  previousLabel={null}*/}
      {/*  pageClassName={styles['pagination-page']}*/}
      {/*  pageLinkClassName={styles['pagination-page-link']}*/}
      {/*  previousClassName={styles['pagination-page-previous']}*/}
      {/*  nextClassName={styles['pagination-page-next']}*/}
      {/*  activeClassName={styles['pagination-page-active']}*/}
      {/*  activeLinkClassName={styles['pagination-page-link-active']}*/}
      {/*  breakClassName={styles['pagination-break']}*/}
      {/*  breakLinkClassName={styles['pagination-break-link']}*/}
      {/*/>*/}
    </div>
  )
}

export default Pagination
