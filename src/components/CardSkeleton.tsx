import * as React from "react";
import { StyleSheet, View } from "react-native";

import * as Color from "../styles/colors";

interface Props {
    skeletonLengths: (number | null)[];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    cell: {
        backgroundColor: Color.mineShaftSolid,
        borderRadius: 5,
        padding: 10
    },
    skeleton: {
        opacity: 0.2,
        marginTop: 10,
        backgroundColor: Color.nobel,
        height: 12
    }
});

export default class CardSkeleton extends React.PureComponent<Props> {
    render() {
        const { skeletonLengths } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.cell}>
                    {skeletonLengths.map((length, index) => (
                        <View
                            key={`skeleton_${index}`}
                            style={[
                                styles.skeleton,
                                length ? { width: length } : undefined
                            ]}
                        />
                    ))}
                </View>
            </View>
        );
    }
}
