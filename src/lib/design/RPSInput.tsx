import { useEffect, useState } from 'react'
import { motion, HTMLMotionProps, MotionConfig } from 'framer-motion'
import rock from '@assets/rock.webp'
import paper from '@assets/paper.webp'
import scissors from '@assets/scissors.webp'

type Value = 0 | 1 | 2 | 3

const options = [
  { img: rock, value: 1 },
  { img: paper, value: 2 },
  { img: scissors, value: 3 },
] as const

export function RPSInput({
  value,
  onChange,
  disabled,
  style,
  ...props
}: Omit<HTMLMotionProps<'div'>, 'children' | 'onChange'> & {
  value?: Value
  onChange?: (value: Value) => void
  disabled?: boolean
}) {
  const [__value, setValue] = useState<Value>(0)

  useEffect(() => {
    setValue(value || 0)
  }, [value, setValue])

  useEffect(() => {
    onChange?.(__value)
  }, [__value, onChange])

  return (
    <MotionConfig transition={{ duration: 0.21 }}>
      <motion.div
        style={{
          pointerEvents: disabled ? 'none' : 'all',
          display: 'flex',
          gap: '12px',
          justifyContent: 'space-between',
          ...style,
        }}
        {...props}
      >
        {options.map(({ img, value }) => (
          <motion.div
            key={value}
            whileHover={{ scale: 1.12, cursor: 'pointer' }}
            animate={{
              opacity: __value === value ? 1 : 0.32,
            }}
            style={{
              width: 144,
              height: 160,
              background: `url(${img})`,
            }}
            onClick={() => !disabled && setValue(value)}
          />
        ))}
      </motion.div>
    </MotionConfig>
  )
}
