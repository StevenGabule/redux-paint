import { useEffect, MouseEvent } from 'react';
import { clearCanvas, drawStroke, setCanvasSize } from './utils/canvasUtils';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPanel } from './shared/ColorPanel';
import { EditPanel } from './shared/EditPanel';
import { historyIndexSelector } from './modules/historyIndex/slice';
import { currentStrokeSelector } from './modules/currentStroke/slice';
import { beginStroke, updateStroke } from './modules/currentStroke/slice';
import { endStroke } from './modules/shareActions';
import { useCanvas } from './CanvasContext';
import { FilePanel } from './shared/FilePanel';
import { ModalLayer } from './ModalLayer';
import { strokesSelector } from './modules/strokes/selectors';
import { AppDispatch } from './store';

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const canvasRef = useCanvas();
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') };
  };

  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) return;

    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStroke]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) return;

    requestAnimationFrame(() => {
      clearCanvas(canvas);

      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach((stroke) => {
          drawStroke(context, stroke.points, stroke.color);
        });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex, strokes]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) return;

    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 5;
    context.strokeStyle = 'black';

    clearCanvas(canvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({x: offsetX, y: offsetY}));
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({ x: offsetX, y: offsetY }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({historyIndex, stroke: currentStroke}));
    }
  };

  return (
    <div className='window'>
      <div className='title-bar'>
        <div className='title-bar-text'>Redux Paint</div>
        <div className='title-bar-controls'>
          <button aria-label='Close' />
        </div>
      </div>
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <ModalLayer />
      <canvas onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseOut={endDrawing} onMouseMove={draw} ref={canvasRef} />
    </div>
  );
}

export default App;
