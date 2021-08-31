import { Button, Center, Checkbox, HStack, Input, Stack, Text } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState, MouseEvent } from 'react'
import { apiClient, getTask } from '../lib/apiClient'
import { Task } from '../api/@types'


export default function Home() {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [label, setLabel] = useState('')

  const fetchTask = useCallback(async () => {
    const res = await apiClient.task.$get();
    const res2 = await getTask();
    setTasks(res);
  }, [])

  const handleChangeInputLabel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value),
    []
  )

  const handleDeleteTask = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    const { id: stringId } = e.currentTarget.dataset;
    if (!stringId) return;

    const id = Number.parseInt(stringId, 10);

    await apiClient.task._id(id).$delete();
    fetchTask()
  }, [fetchTask])

  const handleClickCreateTask = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!label) return


      await apiClient.task.post({ body: { title: label, description: "test" } })
      setLabel('')
      fetchTask()
    },
    [fetchTask, label]
  )

  const handleClickCheckbox = useCallback(async (e: FormEvent<HTMLInputElement>, task: Task) => {
    const { checked } = e.currentTarget;

    if (checked) {
      await apiClient.task._id(task.id).$patch({ body: { status: "DONE" } });
    } else {
      await apiClient.task._id(task.id).$patch({ body: { status: "OPEN" } });
    }

    fetchTask()

  }, [fetchTask])

  useEffect(() => {
    fetchTask()
  }, [fetchTask])

  return (
    <>
      {/* <FormControl>
        <Link href="/autocomplete">autocomplete</Link>
        <br />
        <Link href="/dd">dd</Link>
        <br />
        <Link href="/dropzone">dropzone</Link>
        <br />
        <Link href="/cropper">cropper</Link>
        <br />
        <Link href="/cropper-easy">cropper-easy</Link>
        <br />
        <Link href="/toast">toast</Link>
        <br />
        <Button>hoge</Button>
      </FormControl> */}
      <HStack maxW={500} justifyContent='center' margin={"auto"} mt={5}>

        <Stack spacing={3} justifyContent="center">
          <Center>
            <Input marginRight={5} onChange={handleChangeInputLabel} value={label} />
            <Button onClick={handleClickCreateTask}>ADD</Button>
          </Center>
          {tasks?.map(task => (
            <Center justifyContent="space-between" key={task.id}>
              <HStack>
                <Checkbox marginRight={1} isChecked={task.status === "DONE"} onChange={(e) => handleClickCheckbox(e, task)} />
                <Text>{task.title}</Text>
              </HStack>
              <Button onClick={handleDeleteTask} data-id={task.id}>DELETE</Button>
            </Center>))}
        </Stack>
      </HStack>
    </>
  )
}