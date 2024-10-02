import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow';
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';

const CourseListRowHead = [
  { cellOne: 'Available courses', cellTwo: null, isHeader: true },
  { cellOne: 'Course name', cellTwo: 'Credit', isHeader: true },
];

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.onChangeRow = this.onChangeRow.bind(this);
  }

  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow(id, checked) {
    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  }

  render() {
    const { listCourses } = this.props;

    return (
      <table className={css(styles.CourseList)}>
        <thead>
          {CourseListRowHead.map((course, idx) => (
            <CourseListRow
              key={idx}
              textFirstCell={course.cellOne}
              textSecondCell={course.cellTwo}
              isHeader={course.isHeader}
              classname={css(
                course.cellTwo === null ? styles.colspanTwo : styles.th
              )}
            />
          ))}
        </thead>
        <tbody>
          {listCourses ? (
            listCourses.map(({ id, name, credit }) => (
              <CourseListRow
                key={id}
                textFirstCell={name}
                textSecondCell={credit}
                classname={css(styles.td)}
              />
            ))
          ) : (
            <CourseListRow
              textFirstCell='No course available yet'
              classname={css(styles.td)}
            />
          )}
        </tbody>
      </table>
    );
  }
}

const styles = StyleSheet.create({
  CourseList: {
    width: '100%',
    marginTop: '0.6rem',
    border: '1px solid #e8e8e8',
    borderCollapse: 'collapse',
  },

  colspanTwo: {
    textAlign: 'center',
  },

  th: {
    textAlign: 'left',
    borderBottom: '1px solid #e8e8e8',
    padding: '0.5rem',
  },

  td: {
    padding: '0.5rem',
  },
});

export const mapStateToProps = (state) => {
  const coursesList = getListCourses(state);
  return {
    listCourses: coursesList,
  };
};

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);