import { useRecoilState, useRecoilValue } from 'recoil';
import { canvasRefState } from '@/atoms/canvasAtoms';

export default function Line()  {
    const localRef = useRecoilValue(canvasRefState);
    const ctx = localRef?.getContext("2d");
    
}