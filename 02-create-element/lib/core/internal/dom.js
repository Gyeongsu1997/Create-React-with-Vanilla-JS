const _setAttributes = function ($el, props) {
  Object.entries(props || {}).filter(([value]) => value).forEach(([attr, value]) => {
    $el.setAttribute(attr, value);
  });
};
const _createElement = function (node) {
  if (node === null || typeof node === 'undefined' || typeof node === 'boolean') {
    return null;
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node);
  }
  // 이 부분이 핵심입니다. node의 type이 함수라면 props와 children을 인자로 해당 함수를 호출합니다.  
  if (typeof node.type === 'function') {
    return _createElement(node.type({
      ...node.props,
      children: node.children
    }));
  }
  const $el = document.createElement(node.type);
  _setAttributes($el, node.props);
  node.children.map(_createElement).filter(Boolean).forEach(child => $el.appendChild(child));
  return $el;
};
export { _createElement };