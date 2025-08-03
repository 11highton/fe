import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { use, useCallback, useEffect } from "react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Icon from "../components/core/Icon"
import Image from "../components/core/Image"
import usePost from "../../hooks/usePost"
import { useAudio } from "../../hooks/useAudio";
import { AnimatePresence } from "framer-motion";

const Post = () => {
    const { id } = useParams();
    const {
        audioRef,
        isPlaying,
        isMuted,
        loadBlob,
        play,
        pause,
        toggleMute,
        setTime
      } = useAudio(v => setTimeline(v));
    const theme = useTheme()
    const { title, setTitle, idx, setIdx, total, setTotal, script, setScript, getPost, getAudio, audio, timeline, setTimeline } = usePost(id!)

    useEffect(() => {
        if (id) {
            getPost()
            getAudio()
        }
    }, [id])

    useEffect(() => {
        if (audio) loadBlob(audio)
    }, [audio])

    useEffect(() => {
        if(script.length === 0) return
        const idx = script.filter((s) => s.timeline <= timeline).length - 1
        setIdx(idx)
    }, [timeline, script])

    const changeIdx = useCallback((idx: number) => {
        if (idx < 0 || idx >= script.length) return
        setTime(script[idx].timeline+0.001)
        setIdx(idx)
    }, [script])

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <audio ref={audioRef} style={{ display: 'none' }}></audio>
            <VStack initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ stiffness: 400 }} w="100%" h="100%" maxw="480px" bgColor={theme.colors.bgWeak}>
                <HStack w="100%" pv={14} ph={20} gap={6} align="cl">
                    <HStack p={4} onClick={() => {}} cursor="pointer">
                        <Icon name="back" size={24} colors={[theme.colors.ctRegular]} />
                    </HStack>
                    <VStack initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ stiffness: 400 }} flex={1} gap={6}>
                        <Text w="100%" value={`${idx+1}/${total}`} font={theme.fonts.sm} color={theme.colors.ctRegular} align="center" />
                        <Text w="100%" value={title} font={theme.fonts.ls} color={theme.colors.ctRegular} align="center" />
                    </VStack>
                    <HStack p={4} onClick={() => {toggleMute()}} cursor="pointer">
                        <Icon name={isMuted? "mute" : "volume"} size={24} colors={[theme.colors.ctRegular]} />
                    </HStack>
                </HStack>
                <AnimatePresence mode="popLayout">
                    <VStack key={idx} initial={{ scale: 0.8, y: -20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.8, y: 20, opacity: 0 }} transition={{ stiffness: 400 }} w="100%" ph={20} flex={1} gap={24} align="c">
                        <Image src="/rabbit_front.png" alt="rabbit" w="40%" />
                        <Text value={script[idx]?.text} font={theme.fonts.lm} color={theme.colors.ctStrong} align="center" /> 
                    </VStack>
                </AnimatePresence>
                <HStack initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ stiffness: 400 }} w="100%" pv={28} gap={40} align="c">
                    <HStack align="c" p={18} r={32} olColor={theme.colors.outline} onClick={() => changeIdx(idx - 1)} cursor="pointer">
                        <Icon name={"prev"} size={20} colors={[theme.colors.ctRegular]} />
                    </HStack>
                    <HStack align="c" p={18} r={32} olColor={theme.colors.outline} onClick={() => {if (isPlaying) {pause()} else {play()}}} cursor="pointer">
                        <Icon name={isPlaying ? "pause" : "play"} size={20} colors={[theme.colors.ctRegular]} />
                    </HStack>
                    <HStack align="c" p={18} r={32} olColor={theme.colors.outline} onClick={() => changeIdx(idx + 1)} cursor="pointer">
                        <Icon name={"next"} size={20} colors={[theme.colors.ctRegular]} />
                    </HStack>
                </HStack>
                <HStack initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ stiffness: 400 }} w="100%" pv={16} ph={16} gap={10} align="c" onClick={() => {changeIdx(Math.ceil(total/2)+1)}} cursor="pointer">
                    <Text value="해몽으로 넘기기" font={theme.fonts.mm} color={theme.colors.ctRegular} />
                    <Icon name={"front"} size={20} colors={[theme.colors.ctRegular]} />
                </HStack>
            </VStack>
        </VStack>
    )
}

export default Post
