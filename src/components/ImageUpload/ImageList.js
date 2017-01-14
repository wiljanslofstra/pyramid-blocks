import React, { PropTypes, Component } from 'react';
import uuid from 'uuid';
import moveInArray from '../../helpers/moveInArray';

class ImageList extends Component {
  constructor(props) {
    super(props);

    this.onMoveClick = this.onMoveClick.bind(this);
  }

  onChange(e, index) {
    const val = e.currentTarget.value;
    const files = this.props.files.slice(0);

    const newFiles = files.map((file, i) => {
      const dupFile = file;

      if (i === index) {
        dupFile.alt = val;
      }

      return dupFile;
    });

    this.props.onChange(newFiles);
  }

  onMoveClick(e, i, direction) {
    e.preventDefault();

    const dupFiles = this.props.files.slice(0);

    const newIndex = (direction === 'down') ? (i + 1) : (i - 1);

    if (
      newIndex < 0 ||
      newIndex > dupFiles.length - 1
    ) {
      return;
    }

    const movedFiles = moveInArray(dupFiles, i, newIndex);

    this.props.onChange(movedFiles);
  }

  onRemoveClick(e, i) {
    e.preventDefault();

    let files = this.props.files.slice(0);

    files = files.filter((file, ind) => (ind !== i));

    this.props.onChange(files);
  }

  render() {
    const list = this.props.files.map((file, i) => {
      const preview = (typeof file.preview !== 'undefined') ? file.preview : file.url;

      const imageId = `alt-text-${uuid()}`;

      const altVal = (typeof file.alt !== 'undefined') ? file.alt : file.name;

      return (
        <div className="PyramidImageList__Row" key={i}>
          <div className="PyramidImageList__Thumb">
            <img className="PyramidImageList__Image" src={preview} alt={file.name} />
          </div>

          <div className="PyramidImageList__Content">
            <label htmlFor={imageId} className="PyramidFormLabel">
              Alternative text
            </label>

            <input
              className="PyramidFormControl"
              type="text"
              value={altVal}
              name="alt-text"
              id={imageId}
              onChange={(e) => { this.onChange(e, i); }}
            />

            <button onClick={(e) => { this.onRemoveClick(e, i); }}>
              Remove image
            </button>

            <button onClick={(e) => { this.onMoveClick(e, i, 'up'); }}>
              Up
            </button>

            <button onClick={(e) => { this.onMoveClick(e, i, 'down'); }}>
              Down
            </button>
          </div>
        </div>
      );
    });

    return (
      <div className="PyramidImageList">
        {list}
      </div>
    );
  }
}

ImageList.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func,
};

export default ImageList;
