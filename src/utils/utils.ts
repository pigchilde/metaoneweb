export const isFull = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      return true;
    } else {
      return false;
    }
  }
};
//字节数获取
export const cutString = (pStr: string, pLen: number) => {
  // 原字符串长度
  const _strLen = pStr.length;
  let _cutString: any;
  // 默认情况下，返回的字符串是原字符串的一部分
  let _cutFlag = '1';
  let _lenCount = 0;
  let _ret = false;

  if (_strLen <= pLen / 2) {
    _cutString = pStr;
    _ret = true;
  }
  if (!_ret) {
    for (let i = 0; i < _strLen; i++) {
      const strChar = pStr.charAt(i);
      if (isFull(strChar)) {
        _lenCount += 2;
      } else {
        _lenCount += 1;
      }

      if (_lenCount > pLen) {
        _cutString = pStr.substring(0, i);
        _ret = true;
        break;
      } else if (_lenCount === pLen) {
        _cutString = pStr.substring(0, i + 1);
        _ret = true;
        break;
      }
    }
  }
  if (!_ret) {
    _cutString = pStr;
    _ret = true;
  }
  if (_cutString.length === _strLen) {
    _cutFlag = '0';
  }
  return { cutstring: _cutString, cutflag: _cutFlag };
};
//省略号
export const autoAddEllipsis = (str: string, len: number) => {
  const _ret = cutString(str, len);
  const _cutFlag = _ret.cutflag;
  const _cutStringn = _ret.cutstring;
  if ('1' === _cutFlag) {
    return {
      data: _cutStringn + '...',
      isEllipsis: true,
    };
  } else {
    return {
      data: _cutStringn,
      isEllipsis: false,
    };
  }
};
/**
 * 获取url参数
 * this.$utils.getParameterByName(name)
 */
export function getParameterByName(name: string) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1]);
}
