import { Flex, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import React, { useState } from "react"
import AutocompleteSelect from "../components/AutocompleteSelect";
import { NoSSR } from "../components/NoSSR";


const items = ["Seattle", "San Francisco", "Springfield", "New York", "Boston"];

const Autocomplete: NextPage = () => {
  const [value, setValue] = useState<string>("")

  return (
    <NoSSR>
      <Flex direction="column" align="center">
        <Text as="label" fontSize="lg">
          Choose a city
        </Text>
        <AutocompleteSelect items={items} value={value} setValue={setValue} />
      </Flex>
    </NoSSR>
  )
}

export default Autocomplete