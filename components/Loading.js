import Image from 'next/image';
import styled from 'styled-components'
import { Circle } from 'better-react-spinkit'

const Loading = () => {
  return (
    <center style={{
      display: "grid",
      placeItems: "center",
      height: "100vh",
      backgroundColor: "white"
    }}>
      <div>
        <Image
          priority
          src='/MessWithIt.png'
          alt=""
          height={200}
          width={200}
          style={{ marginBottom: 10, borderRadius: 10 }}
        />
        <Circle
          color="#fc039d"
          size={80}
        />
      </div>
    </center>
  );
}

export default Loading;